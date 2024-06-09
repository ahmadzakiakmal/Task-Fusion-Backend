-- +goose Up
-- +goose StatementBegin
CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    project_id INT,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    milestone VARCHAR(50) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(project_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE task;
-- +goose StatementEnd
