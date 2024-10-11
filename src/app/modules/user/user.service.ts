import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

// create user into the database
const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

const createTraineeIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

const createTrainerIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

const getSingleUserByObjectIdFromDB = async (objectId: string) => {
  const user = await User.findById(
    { _id: objectId },
    {
      password: 0,
      'name._id': 0,
      __v: 0,
    },
  ).populate('classSchedules');
  return user;
};

const getAllTrainersFromDB = async () => {
  const user = await User.find(
    { role: 'trainer' },
    {
      password: 0,
      'name._id': 0,
      __v: 0,
    },
  ).populate('classSchedules');
  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().populate('classSchedules'), query)
    .search(userSearchableFields)
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

const updateUserIntoDB = async (objectId: string, payload: TUser) => {
  const { name, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // (because all are unique) Remove email, phone, and userId if they match the current user's data
  const currentUser = await User.findById(objectId);
  if (currentUser) {
    if (modifiedUpdatedData.email === currentUser.email) {
      delete modifiedUpdatedData.email;
    }
    if (modifiedUpdatedData.password) {
      delete modifiedUpdatedData.password;
    }
  }

  const user = await User.findByIdAndUpdate(objectId, modifiedUpdatedData, {
    new: true,
    runValidators: true,
    fields: { password: 0, 'name._id': 0, __v: 0 },
  });

  return user;
};

const deleteUserFromDB = async (objectId: string) => {
  const user = await User.findByIdAndUpdate(
    objectId,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return user;
};

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select(
    '-password -__v -name._id',
  ).populate('classSchedules');
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createTraineeIntoDB,
  createTrainerIntoDB,
  getAllTrainersFromDB,
  getSingleUserByObjectIdFromDB,
  getAllUsersFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  getMeFromDB,
  changeStatus,
};
