import postgres from "postgres"

// Connect to the database

export const sql = postgres("postgres://docker:docker@localhost:5432/shortlinks")

// Export the sql function


