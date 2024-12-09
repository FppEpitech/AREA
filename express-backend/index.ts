import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { updateCronJob, checkCronResultJob } from './cron/UpdateCron';
import plumsRouter from './routes/plums';
import cors from 'cors';
import accountRouter from './routes/account';

dotenv.config();

checkCronResultJob.start();
updateCronJob.start();

const app = express();
app.use(express.json());
app.use(cors());

let apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use('/plums', plumsRouter);

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

export default app;

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
