import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app: Application = express();
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developer, I know you can do it !');
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
