import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js'; // Import the pool here

// Import routes and middlewares
import productRoute from './routes/productRoute.js';
import authRoute from './routes/authRoute.js';

import { authGuard } from './middlewares/authGuard.js';

// Initialize app and load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware setup
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((error) => console.log("MongoDB connection error: ", error));

// Define routes
app.use('/api/products', productRoute); // Product routes (MongoDB)
app.use('/api/auth', authRoute); // Authentication routes (PostgreSQL)
app.delete('/api/loginusers/delete/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    console.log("Deleting user with ID:", userId);
    const sql = "DELETE FROM login WHERE id = $1::uuid RETURNING *";
    const result = await pool.query(sql, [userId]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user: ", err);
    return res.status(500).json({ error: err.message, details: err.stack });
  }
});





// Example protected route
app.get('/api/protected', authGuard, (req, res) => {
    res.json({ message: 'Welcome to the protected route' });
});

// Test PostgreSQL connection using the pool
pool.connect((err, client) => {
    if (err) {
        console.error("Error in PostgreSQL connection:", err);
        return; // Exit if there's an error
    } else {
        console.log("Connected to PostgreSQL successfully.");
        client.release(); // Release the client
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
