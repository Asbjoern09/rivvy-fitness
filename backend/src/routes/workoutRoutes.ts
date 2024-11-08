import { Router } from 'express';
import { Workout } from '../models/Workout';
import { protect } from '../middleware/authMiddleware';
import { createWorkout } from '../controllers/workoutController';


const router = Router();

router.post('/addWorkout', protect, createWorkout);

export default router;
