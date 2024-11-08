import { Request, Response } from 'express';
import { Workout } from '../models/Workout';

export const createWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    console.log(req.body)
    const  exercise  = req.body.exercise;
    const userId = req.user._id;

    const workout = new Workout({ userId, exercise});
    await workout.save();

    res.status(201).json(workout);
  } catch (error) {
    console.error('Failed to create workout:', error);
    res.status(500).json({ error: 'Failed to create workout' });
  }
};
