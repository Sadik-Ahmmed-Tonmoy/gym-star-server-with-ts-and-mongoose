/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TClass {
  id?: string;
  className: string;
  trainer: Types.ObjectId;
  date: Date;
  startTime: string;    
  endTime: string;  
  duration: string;
  maxTrainees: number;
  enrolledTrainees: Types.ObjectId[];
  isDeleted: boolean;
  description?: string;
}

export interface ClassModel extends Model<TClass> {
  isClassExists(id: string): Promise<TClass | null>;
  isTrainerAvailable(trainerId: string): Promise<boolean>;
  isTraineeEnrolled(classId: string, traineeId: string): Promise<boolean>;
  isTraineeEnrolledInAnyClass(traineeId: string): Promise<boolean>;
  isTraineeEnrolledInClass(
    traineeId: string,
    classId: string,
  ): Promise<boolean>;
  isClassFull(classId: string): Promise<boolean>;
  isClassStarted(classId: string): Promise<boolean>;
  isClassEnded(classId: string): Promise<boolean>;
  isClassDeleted(classId: string): Promise<boolean>;
  isTrainerExists(trainerId: string): Promise<boolean>;
  isTrainerDeleted(trainerId: string): Promise<boolean>;
  isTraineeExists(traineeId: string): Promise<boolean>;
  isTraineeDeleted(traineeId: string): Promise<boolean>;
  enrollTrainee(classId: string, traineeId: string): Promise<void>;
  removeTrainee(classId: string, traineeId: string): Promise<void>;
  getClassesByTrainerId(trainerId: string): Promise<TClass[]>;
}
