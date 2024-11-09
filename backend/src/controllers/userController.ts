import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select("-password");
    
    if (!user) {
      res.status(404).send("User not found");
      return; // Ensure TypeScript recognizes this as a complete code path
    }
    

    res.json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
    return; // Likewise, complete this path for TypeScript
  }
};
