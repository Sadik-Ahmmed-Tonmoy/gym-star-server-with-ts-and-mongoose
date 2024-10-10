import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/create-trainee',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createTrainee,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.trainer, USER_ROLE.trainee),
  UserControllers.getMe,
);

router.patch(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.trainer, USER_ROLE.trainee),
  UserControllers.updateUser,
);

router.get('/',  auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get('/:objectId', auth(USER_ROLE.admin, USER_ROLE.trainer, USER_ROLE.trainee), UserControllers.getSingleUserByObjectId);
 
router.patch(
  '/:objectId',
  auth(USER_ROLE.admin, USER_ROLE.trainee),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.delete('/:objectId', auth(USER_ROLE.admin), UserControllers.deleteUser);

export const userRoutes = router;
