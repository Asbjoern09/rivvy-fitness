import mongoose, { Schema, Document } from 'mongoose';

interface WorkoutDocument extends Document {
  userId: mongoose.Types.ObjectId;
  exercise: string
}

const workoutSchema = new Schema<WorkoutDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: String, required: true },
});

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
