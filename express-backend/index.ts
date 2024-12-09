import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { updateCronJob, checkCronResultJob } from './cron/UpdateCron';
import cors from 'cors';
import plumsRouter from './routes/plums';
import accountRouter from './routes/account';
import triggerRouter from './routes/trigger';
import actionRouter from './routes/action';

dotenv.config();

checkCronResultJob.start();
updateCronJob.start();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use('/plums', plumsRouter);
app.use('/actions', actionRouter);
app.use('/triggers', triggerRouter);

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
