-- MySQL schema for user accounts

-- Drop tables if they exist to allow for clean recreation
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_roles;


-- Create the roles table
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert some default roles (admin, user)
INSERT INTO roles (role_name) VALUES ('admin'), ('user');


-- Create the users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Store password hash, not plain text
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the user_roles junction table (many-to-many relationship)
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)  -- Composite key for unique user-role combinations
);

-- Add indexes for improved performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);


--Example usage (inserting a user):
-- INSERT INTO users (username, password_hash, email) VALUES ('testuser', '$2y$10$/.f.e/Z7x25E0lW/p2YfVuF/0x/tZ5jH.k45lH5f9sXh/X48m16C.', 'test@example.com'); -- Replace with a properly hashed password.
-- INSERT INTO user_roles (user_id, role_id) SELECT LAST_INSERT_ID(), (SELECT role_id FROM roles WHERE role_name = 'user');