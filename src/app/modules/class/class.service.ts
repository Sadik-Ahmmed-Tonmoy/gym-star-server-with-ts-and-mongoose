import { Class } from './class.model';
import { TClass } from './class.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import moment from 'moment';
import mongoose from 'mongoose';
import { classSearchableFields } from './class.constant';

const createClassInDB = async (classData: TClass) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { startTime } = classData;
    // Calculate 2 hours after start time and add to end time
    const endTime = moment(startTime, 'HH:mm').add(2, 'hours').format('HH:mm');
    classData.endTime = endTime;

    // Check if any class overlaps with the start and end time
    const isClassOverlapping = await Class.findOne({
      date: classData.date,
      $or: [
        {
          // Case where the new class starts during an existing class
          startTime: { $lte: classData.startTime },
          endTime: { $gt: classData.startTime },
        },
        {
          // Case where the new class ends during an existing class
          startTime: { $lt: classData.endTime },
          endTime: { $gte: classData.endTime },
        },
        {
          // Case where the new class fully contains an existing class
          startTime: { $gte: classData.startTime },
          endTime: { $lte: classData.endTime },
        },
      ],
    }).session(session);

    if (isClassOverlapping) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Class overlaps with existing class: ${isClassOverlapping.className} (${isClassOverlapping?.startTime} to ${isClassOverlapping?.endTime} ), Please choose a different time.`,
      );
    }

    // Create the class within the transaction
    const newClass = await Class.create([classData], { session });

    // Update the trainer's class list within the transaction
    await User.findByIdAndUpdate(
      classData.trainer,
      { $push: { classes: newClass[0]._id } }, // `newClass` is an array when using `create` with transactions
      { new: true, session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newClass[0]; // Return the created class object
  } catch (error) {
    // Abort the transaction in case of any errors
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow the error to be handled elsewhere
  }
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
