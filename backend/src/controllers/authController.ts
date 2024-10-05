import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/generateToken';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  name: string;
  password: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    }) as IUser;

    res.status(201).json({
      message: 'User registered',
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name }) as IUser | null;
    
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    res.json({
      message: 'Logged in',
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};