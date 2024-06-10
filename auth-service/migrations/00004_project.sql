-- +goose Up
-- +goose StatementBegin
CREATE TABLE Project (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE Project;
-- +goose StatementEnd
