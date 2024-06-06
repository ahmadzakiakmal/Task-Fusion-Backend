package context

import (
	"context"

	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/models"
)

type key string

const (
	userKey key = "user"
)

func WithUser(ctx context.Context, user *models.User) context.Context {
	return context.WithValue(ctx, userKey, user)
}

func User(ctx context.Context) *models.User {
	val := ctx.Value(userKey)
	user, ok := val.(*models.User)
	if !ok {
		// THE MOST LIKELY CASE IS THAT NONTHING WAS EVER STORED IN THE CONTEXT
		// SO IT DOESN'T HAVE A TYPE OF *models.User.
		// IT IS ALSO POSSIBLE THAT OTHER CODE IN THIS PACKAGE WROTE AN INVALID
		// VALUE USING THE userKey
		return nil
	}

	return user
}
