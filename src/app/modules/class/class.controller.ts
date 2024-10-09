import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassServices } from './class.service';

const createClass = catchAsync(async (req: Request, res: Response) => {
  const classData = req.body;
  const result = await ClassServices.createClassInDB(classData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class created successfully',
    data: result,
  });
});

const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.getAllClassesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Classes retrieved successfully',
    data: result,
  });
});

const getSingleClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const result = await ClassServices.getSingleClassFromDB(classId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class retrieved successfully',
    data: result,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const updateData = req.body;
  const result = await ClassServices.updateClassInDB(classId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class updated successfully',
    data: result,
  });
});

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  await ClassServices.deleteClassFromDB(classId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class deleted successfully',
    data: null,
  });
});

const enrollTraineeInClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { traineeId } = req.body; 
  const result = await ClassServices.enrollTraineeInClassInDB(classId, traineeId.toString());

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee enrolled successfully',
    data: result,
  });
});

const removeTraineeFromClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { traineeId } = req.body;
  const result =  await ClassServices.removeTraineeFromClassInDB(classId, traineeId.toString());
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee removed successfully',
    data: result
  });
});

export const ClassControllers = {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
  enrollTraineeInClass,
  removeTraineeFromClass,
};
