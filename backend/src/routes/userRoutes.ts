import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/users', protect, userController.getUsers);
router.get('/users/:id', protect, userController.getUserById);

export default router;

import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};