-- +goose Up
-- +goose StatementBegin
CREATE TABLE Project_user (
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    is_master BOOLEAN NOT NULL,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES Project(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE Project_user;
-- +goose StatementEnd
