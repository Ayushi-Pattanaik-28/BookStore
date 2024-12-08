// import { pool } from '../config/db.js'; // Use a named import for pool

// // Define the function to create a user in the database
// export const createUser = async (user_name, user_email, user_password) => {
//   const query = `
//     INSERT INTO users (user_name, user_email, user_password) 
//     VALUES ($1, $2, $3) RETURNING *;
//   `;
//   const values = [user_name, user_email, user_password];

//   try {
//     const result = await pool.query(query, values);
//     return result.rows[0]; // Return the newly created user
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw new Error('Error creating user in the database');
//   }
// };
