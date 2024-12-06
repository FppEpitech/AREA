import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { UpdateCronJob, CheckCronResultJob } from './cron/UpdateCron';

import accountRouter from './routes/account';

dotenv.config();

CheckCronResultJob.start();
UpdateCronJob.start();

const app = express();
app.use(express.json());

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
