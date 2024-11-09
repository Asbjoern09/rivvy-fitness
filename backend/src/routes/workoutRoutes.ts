import { Router } from 'express';
import { Workout } from '../models/Workout';
import { protect } from '../middleware/authMiddleware';
import { createWorkout, getExercise } from '../controllers/workoutController';


const router = Router();

router.post('/addWorkout', protect, createWorkout);

router.get('/getExercises', protect, getExercise);

export default router;
