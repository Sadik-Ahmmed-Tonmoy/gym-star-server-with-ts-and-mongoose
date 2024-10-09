import { Class } from './class.model';
import { TClass } from './class.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { classSearchableFields } from './class.constain';
import { Schema } from 'mongoose';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createClassInDB = async (classData: TClass) => {
  const { trainer } = classData;

  // Check if the trainer exists and has a valid role (Trainer)
  const trainerExists = await User.findOne({ _id: trainer, role: 'trainer' });
  if (!trainerExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Trainer not found or invalid role',
    );
  }
  return await Class.create(classData);
};

const getAllClassesFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Class.find().populate('trainer'), query)
    .search(classSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleClassFromDB = async (classId: string) => {
  return await Class.findById(classId)
    .populate('trainer')
    .populate('enrolledTrainees');
};

const updateClassInDB = async (
  classId: string,
  updateData: Partial<TClass>,
) => {
  const { trainer } = updateData;

  // If trainer is updated, ensure the new trainer exists
  if (trainer) {
    const trainerExists = await User.findOne({ _id: trainer, role: 'trainer' });
    if (!trainerExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Trainer not found or invalid role',
      );
    }
  }

  return await Class.findByIdAndUpdate(classId, updateData, { new: true });
};

const deleteClassFromDB = async (classId: string) => {
  return await Class.findByIdAndUpdate(
    classId,
    { isDeleted: true },
    { new: true },
  );
};

const enrollTraineeInClassInDB = async (classId: string, traineeId: string) => {
  const selectedClass = await Class.findById(classId);

  if (!selectedClass) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class not found');
  }

  const isTraineeAlreadyEnrolledInClass = await Class.isTraineeEnrolledInClass(
    traineeId,
    classId,
  );
  if (isTraineeAlreadyEnrolledInClass) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This trainee is already enrolled in this class',
    );
  }

  if (selectedClass?.maxTrainees === selectedClass?.enrolledTrainees.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Class is full');
  }

  return await Class.enrollTrainee(classId, traineeId);
};

const removeTraineeFromClassInDB = async (
  classId: string,
  traineeId: string,
) => {
  return await Class.removeTrainee(classId, traineeId);
};

export const ClassServices = {
  createClassInDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  updateClassInDB,
  deleteClassFromDB,
  enrollTraineeInClassInDB,
  removeTraineeFromClassInDB,
};
