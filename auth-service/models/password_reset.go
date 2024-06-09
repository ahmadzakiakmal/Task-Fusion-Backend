package models

import (
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/rand"
)

const (
	DefaultResetDuration = 1 * time.Hour
)

type PasswordReset struct {
	ID        int
	UserID    int
	Token     string
	TokenHash string
	ExpiresAt time.Time
}

type PasswordResetService struct {
	DB            *sql.DB
	BytesPerToken int
	Duration      time.Duration
}

func (service *PasswordResetService) Create(email string) (*PasswordReset, error) {
	// verify valid email, get user id
	email = strings.ToLower(email)
	var userID int
	row := service.DB.QueryRow(`
		SELECT id FROM users WHERE email = $1;`, email)
	err := row.Scan(&userID)
	if err != nil {
		// TODO: consider returning a specific error when the user does not exists
		return nil, fmt.Errorf("create: %w", err)
	}

	bytesPerToen := service.BytesPerToken
	if bytesPerToen < MinBytesPerToken {
		bytesPerToen = MinBytesPerToken
	}

	token, err := rand.String(bytesPerToen)
	if err != nil {
		return nil, fmt.Errorf("create: %w", err)
	}

	duration := service.Duration
	if duration == 0 {
		duration = DefaultResetDuration
	}
	pwReset := PasswordReset{
		UserID:    userID,
		Token:     token,
		TokenHash: service.hash(token),
		ExpiresAt: time.Now().Add(duration),
	}
	// insert pwreset into the db

	row = service.DB.QueryRow(`
		INSERT INTO password_resets (user_id, token_hash, expires_at)
		VALUES ($1, $2, $3) ON CONFLICT (user_id) DO
		UPDATE SET token_hash = $2, expires_at = $3
		RETURNING id;`, pwReset.UserID, pwReset.TokenHash, pwReset.ExpiresAt)
	err = row.Scan(&pwReset.ID)
	if err != nil {
		return nil, fmt.Errorf("create: %w", err)
	}
	return &pwReset, nil
}

func (service *PasswordResetService) Consume(token string) (*User, error) {
	tokenHash := service.hash(token)
	var user User
	var pwReset PasswordReset
	row := service.DB.QueryRow(`
		SELECT password_resets.id, password_resets.expires_at, users.id,
		users.email, users.password FROM password_resets JOIN users ON users.id = password_resets.user_id
		WHERE password_resets.token_hash = $1;`, tokenHash)
	err := row.Scan(&pwReset.ID, &pwReset.ExpiresAt, &user.ID, &user.Email, &user.Password)
	if err != nil {
		return nil, fmt.Errorf("consume: %w", err)
	}
	if time.Now().After(pwReset.ExpiresAt) {
		return nil, fmt.Errorf("token expired: %v", token)
	}
	err = service.delete(pwReset.ID)
	if err != nil {
		return nil, fmt.Errorf("consume: %w", err)
	}
	return &user, nil
}

func (service *PasswordResetService) hash(token string) string {
	tokenHash := sha256.Sum256([]byte(token))
	return base64.URLEncoding.EncodeToString(tokenHash[:])
}

func (service *PasswordResetService) delete(id int) error {
	_, err := service.DB.Exec(`
		DELETE FROM password_resets
		WHERE Id = $1;`, id)
	if err != nil {
		return fmt.Errorf("delete: %w", err)
	}
	return nil
}
