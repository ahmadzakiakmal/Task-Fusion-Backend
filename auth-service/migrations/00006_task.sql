-- +goose Up
-- +goose StatementBegin
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    project_id INT,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    milestone VARCHAR(50) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE task;
-- +goose StatementEnd
