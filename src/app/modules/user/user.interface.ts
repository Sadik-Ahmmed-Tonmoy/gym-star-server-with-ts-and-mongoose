/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export interface TUser {
  _id?: string;
  name: TUserName;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  avatar?: string;
  role: 'admin' | 'trainer' | 'trainee';
  status: 'in-progress' | 'blocked';
  classSchedules?: Types.ObjectId[];
  isDeleted: boolean;
  classCount?: number;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // isUserExistsByCustomId(userId: string): Promise<TUser>;
  //instance methods for checking if the user exists by custom ID or email
  isUserExists(idOrEmail: string): Promise<TUser | null>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
