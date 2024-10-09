import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  }
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
 