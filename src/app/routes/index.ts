import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ClassRoutes } from '../modules/class/class.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  }
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
 