import { Request, Response } from 'express';
import { User } from './types'; // Import the User interface

// Sample user data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

// Get all users
export const getUsers = (req: Request, res: Response) => {
  res.json(users); // Return the array of users
};

// Get user by ID
export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user); // Return the user if found
  } else {
    res.status(404).json({ message: 'User not found' }); // Return 404 if not found
  }
};
