package views

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"log"
	"net/http"

	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/context"
	"github.com/ahmadzakiakmal/Task-Fusion-Backend/auth/models"
)

func Must(t Template, err error) Template {
	if err != nil {
		panic(err)
	}
	return t
}

func ParseFS(fs fs.FS, patterns ...string) (Template, error) {
	tpl := template.New(patterns[0])
	tpl = tpl.Funcs(template.FuncMap{
		"currentUser": func() (*models.User, error) {
			return nil, fmt.Errorf("currentUser not implemented")
		},
		"errors": func() []string {
			return nil
		},
	})

	tpl, err := tpl.ParseFS(fs, patterns...)
	if err != nil {
		return Template{}, fmt.Errorf("Parsing (FS) template: %w", err)
	}

	return Template{
		HTMLTpl: tpl,
	}, nil
}

// func Parse(filepath string) (Template, error) {
// 	tpl, err := template.ParseFiles(filepath)
// 	if err != nil {
// 		return Template{}, fmt.Errorf("Parsing template: %w", err)
// 	}
//
// 	return Template{
// 		HTMLTpl: tpl,
// 	}, nil
// }

type Template struct {
	HTMLTpl *template.Template
}

func (t Template) Execute(w http.ResponseWriter, r *http.Request, data interface{}, errs ...error) {
	tpl, err := t.HTMLTpl.Clone()
	if err != nil {
		log.Printf("Error cloning template: %v", err)
		http.Error(w, "there was an error rendering the page.", http.StatusInternalServerError)
		return
	}
	tpl = tpl.Funcs(template.FuncMap{
		"currentUser": func() *models.User {
			return context.User(r.Context())
		},
		"errors": func() []string {
			var errMessages []string
			for _, err := range errs {
				errMessages = append(errMessages, err.Error())
			}
			return errMessages
		},
	})

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	var buf bytes.Buffer
	err = tpl.Execute(&buf, data)
	if err != nil {
		log.Printf("Error executing template: %v", err)
		http.Error(w, "<h1>Error executin template</h1>", http.StatusInternalServerError)
		return
	}
	io.Copy(w, &buf)
}
