import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const createTrainee = catchAsync(async (req, res) => {
  const userData = req.body;
  userData.role = 'trainee';
  const result = await UserServices.createTraineeIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is created successfully',
    data: result,
  });
});

const createTrainer = catchAsync(async (req, res) => {
  const userData = req.body;
  userData.role = 'trainer';
  const result = await UserServices.createTrainerIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is created successfully',
    data: result,
  });
});

const getSingleUserByObjectId = catchAsync(async (req, res) => {
  const { objectId } = req.params;
  const user = await UserServices.getSingleUserByObjectIdFromDB(objectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: user?._id ? 'User found successfully' : 'User not found',
    data: user,
  });
});

const getAllTrainers = catchAsync(async (req, res) => {
  const user = await UserServices.getAllTrainersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainers retrieved successfully',
    data: user,
  });
});


const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: users.meta,
    data: users.result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.objectId || req.user.id;
  const  userData  = req.body;
  const updatedUser = await UserServices.updateUserIntoDB(id, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully, Please login again if you are the same user',
    data: updatedUser,
  });
});


const deleteUser = catchAsync(async (req, res) => {
  const { objectId } = req.params;
  const deleteUser = await UserServices.deleteUserFromDB(objectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: deleteUser,
  });
});




const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMeFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});


export const UserControllers = {
  createUser,
  createTrainee,
  createTrainer,
  getSingleUserByObjectId,
  getAllTrainers,
  getAllUsers,
  updateUser,
  deleteUser,
  getMe,
  changeStatus,
};
