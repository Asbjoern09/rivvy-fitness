// src/server.ts

import express from 'express';
import { getUsers, getUserById } from './userController'; // Import user logic

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to get all users
app.get('/api/users', getUsers);

// Endpoint to get a user by ID
app.get('/api/users/:id', getUserById);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
