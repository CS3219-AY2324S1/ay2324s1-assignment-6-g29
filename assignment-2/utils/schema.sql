DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    displayName VARCHAR(100) NOT NULL,
    role TEXT,
    CONSTRAINT valid_role CHECK (
        role = 'Admin'
        OR role = 'User'
    )
);