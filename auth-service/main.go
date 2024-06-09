package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/controllers"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/migrations"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/models"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/templates"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/views"
	"github.com/joho/godotenv"

	"github.com/go-chi/chi/v5"
)

type config struct {
	PSQL models.PostgresConfig
	SMTP models.SMTPConfig
	CSRF struct {
		Key    string
		Secure bool
	}
	Server struct {
		Address string
	}
}

func loadEnvConfig() (config, error) {
	var cfg config
	err := godotenv.Load()
	if err != nil {
		return cfg, err
	}
	// TODO: PSQL
	cfg.PSQL = models.DefaultPostgresConfig()

	// TODO: SMTP
	cfg.SMTP.Host = os.Getenv("SMTP_HOST")
	cfg.SMTP.Port, err = strconv.Atoi(os.Getenv("SMTP_PORT"))
	if err != nil {
		panic(err)
	}
	cfg.SMTP.Username = os.Getenv("SMTP_USERNAME")
	cfg.SMTP.Password = os.Getenv("SMTP_PASSWORD")

	cfg.CSRF.Key = "zTRUrqhAFWSH0NR6SsGpFRQn7KqLEvvh"
	cfg.CSRF.Secure = false

	cfg.Server.Address = ":3000"

	return cfg, nil
}

func main() {
	cfg, err := loadEnvConfig()
	if err != nil {
		panic(err)
	}

	// SET UP DATABASE
	db, err := models.Open(cfg.PSQL)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = models.MigrateFS(db, migrations.FS, ".")
	if err != nil {
		panic(err)
	}

	// SETUP SERVICES
	userService := &models.UserService{
		DB: db,
	}
	sessionService := &models.SessionService{
		DB: db,
	}
	pwResetService := &models.PasswordResetService{
		DB: db,
	}
	emailService := models.NewEmailService(cfg.SMTP)

	// SETUP MIDDLEWARE
	umw := controllers.UserMiddleware{
		SessionService: sessionService,
	}
	// csrfMw := csrf.Protect([]byte(cfg.CSRF.Key), csrf.Secure(cfg.CSRF.Secure))

	// SETUP CONTROLLERS
	userC := controllers.Users{
		UserService:          userService,
		SessionService:       sessionService,
		PasswordResetService: pwResetService,
		EmailService:         emailService,
	}

	// SETUP ROUTER AND ROUTES
	r := chi.NewRouter()
	// r.Use(csrfMw)
	r.Use(umw.SetUser)
	r.Get(
		"/",
		controllers.StaticHandler(
			views.Must(views.ParseFS(templates.FS, "home.html", "tailwind.html")),
		),
	)
	r.Post("/signup", userC.Create)
	r.Post("/signin", userC.ProcessSignIn)
	r.Post("/signout", userC.ProcessSignOut)
	r.Post("/forgot-pw", userC.ProcessForgotPassword)
	r.Post("/reset-pw", userC.ProcessResetPassword)
	r.Route("/users/me", func(r chi.Router) {
		r.Use(umw.RequireUser)
		r.Get("/", userC.CurrentUser)
	})
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "Page not found", http.StatusNotFound)
	})

	// START THE SERVER
	fmt.Printf("starting server at %s...\n", cfg.Server.Address)
	err = http.ListenAndServe(cfg.Server.Address, r)
	if err != nil {
		panic(err)
	}
}
