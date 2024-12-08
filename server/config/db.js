import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;

// Database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }, // Adjust this as needed
};

// Create a new pool instance with the configuration
const pool = new Pool(dbConfig);

// Export the pool instance
export default pool; // Use default export for the pool
