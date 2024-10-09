import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ClassControllers } from './class.controller';
import { ClassValidation } from './class.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ClassValidation.createClassValidationSchema),
  ClassControllers.createClass
);

router.get('/', auth(USER_ROLE.admin), ClassControllers.getAllClasses);

router.get('/:classId', auth(USER_ROLE.admin), ClassControllers.getSingleClass);

router.patch(
  '/:classId',
  auth(USER_ROLE.admin), 
  validateRequest(ClassValidation.updateClassValidationSchema),
  ClassControllers.updateClass
);

router.delete('/:classId',  auth(USER_ROLE.admin),  ClassControllers.deleteClass);

router.post('/:classId/enroll', auth(USER_ROLE.admin),  ClassControllers.enrollTraineeInClass);

router.post('/:classId/remove',  auth(USER_ROLE.admin),  ClassControllers.removeTraineeFromClass);

export const ClassRoutes = router;
