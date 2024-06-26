package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/context"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/models"
)

type Users struct {
	UserService          *models.UserService
	SessionService       *models.SessionService
	PasswordResetService *models.PasswordResetService
	EmailService         *models.EmailService
}

type UserOutput struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type RegisterBody struct {
	Email           string `json:"email"`
	Name            string `json:"name"`
	Password        string `json:"password"`
	PasswordConfirm string `json:"password_confirm"`
}

type SigninBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u Users) Create(w http.ResponseWriter, r *http.Request) {
	var data RegisterBody

	if r.Body == nil {
		http.Error(w, "Please send a request body", http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		http.Error(w, "Invalid Json", http.StatusBadRequest)
		return
	}

	if data.Password != data.PasswordConfirm {
		http.Error(w, "Password and PasswordConfirm does not match", http.StatusBadRequest)
		return
	}
	if len(data.Password) < 12 {
		http.Error(w, "Password length must be 12 characters or longer", http.StatusBadRequest)
		return
	}

	user, err := u.UserService.Create(
		data.Email,
		data.Name,
		data.Password,
	)
	if err != nil {
		http.Error(
			w,
			fmt.Sprintf("error while creating a new user: %v", err),
			http.StatusInternalServerError,
		)
		return
	}

	session, err := u.SessionService.Create(user.ID)
	if err != nil {
		fmt.Println(err)
		// TODO: should show a warning about not being able to login
		http.Redirect(w, r, "/signin", http.StatusFound)
		return
	}

	setCookie(w, CookieSession, session.Token)
	type TokenReturn struct {
		Token string `json:"token"`
	}
	tokenoutput := TokenReturn{
		Token: session.Token,
	}
	fmt.Println(session.Token)

	buff, err := json.Marshal(&tokenoutput)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "error marshalling output", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(buff))
}

func (u Users) ProcessSignIn(w http.ResponseWriter, r *http.Request) {
	var data SigninBody

	if r.Body == nil {
		http.Error(w, "Please send a request body", http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		http.Error(w, "Invalid Json", http.StatusBadRequest)
		return
	}

	user, err := u.UserService.Authenticate(data.Email, data.Password)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "something went wrong.", http.StatusInternalServerError)
		return
	}

	session, err := u.SessionService.Create(user.ID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "something went wrong.", http.StatusInternalServerError)
		return
	}

	setCookie(w, CookieSession, session.Token)
	type TokenReturn struct {
		Token string `json:"token"`
	}
	tokenoutput := TokenReturn{
		Token: session.Token,
	}

	buff, err := json.Marshal(&tokenoutput)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "error marshalling output", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(buff))
}

func (u Users) CurrentUser(w http.ResponseWriter, r *http.Request) {
	user := context.User(r.Context())
	return_val := UserOutput{
		ID:    user.ID,
		Email: user.Email,
		Name:  user.Name,
	}

	buff, err := json.Marshal(&return_val)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "error marshalling output", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(buff))
}

func (u Users) ProcessSignOut(w http.ResponseWriter, r *http.Request) {
	token, err := readCookie(r, CookieSession)
	if err != nil {
		http.Redirect(w, r, "/signin", http.StatusFound)
		return
	}

	err = u.SessionService.Delete(token)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
	}
	deleteCookie(w, CookieSession)
	http.Redirect(w, r, "/signin", http.StatusFound)
}

func (u Users) ProcessForgotPassword(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Email string `json:"email"`
	}

	if r.Body == nil {
		http.Error(w, "please send a request body", http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		http.Error(w, "Invalid json", http.StatusBadRequest)
		return
	}

	pwReset, err := u.PasswordResetService.Create(data.Email)
	if err != nil {
		// TODO: handle other cases in the future, for instance, if a user does not exist with that email address
		fmt.Println(err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
	}
	vals := url.Values{
		"token": {pwReset.Token},
	}

	resetURL := "https://taskfusion.com/reset-pw?" + vals.Encode()

	err = u.EmailService.ForgotPassword(data.Email, resetURL)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
	}

	fmt.Fprint(w, "Password Reset Successfully, Check your email")
}

func (u Users) ProcessResetPassword(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}

	if r.Body == nil {
		http.Error(w, "Please send a request body", http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	user, err := u.PasswordResetService.Consume(data.Token)
	if err != nil {
		fmt.Println(err)
		// TODO: distinguish between types of errors
		http.Error(w, "something went wrong", http.StatusInternalServerError)
		return
	}

	err = u.UserService.UpdatePassword(user.ID, data.Password)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "something went wrong", http.StatusInternalServerError)
		return
	}
	// Sing the user in now that their password has been reset
	session, err := u.SessionService.Create(user.ID)
	if err != nil {
		fmt.Println(err)
		http.Redirect(w, r, "/signin", http.StatusFound)
		return
	}
	setCookie(w, CookieSession, session.Token)
	http.Redirect(w, r, "/users/me", http.StatusFound)
}

type UserMiddleware struct {
	SessionService *models.SessionService
}

func (umw UserMiddleware) SetUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := readCookie(r, CookieSession)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		user, err := umw.SessionService.User(token)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		ctx := r.Context()
		ctx = context.WithUser(ctx, user)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func (umw UserMiddleware) RequireUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := context.User(r.Context())
		if user == nil {
			http.Redirect(w, r, "/signin", http.StatusFound)
			return
		}
		next.ServeHTTP(w, r)
	})
}
