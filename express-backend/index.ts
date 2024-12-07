import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { updateCronJob, checkCronResultJob } from './cron/UpdateCron';
import plumsRouter from './routes/plums';

import accountRouter from './routes/account';

dotenv.config();

checkCronResultJob.start();
updateCronJob.start();

const app = express();
app.use(express.json());

let apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use('/plums', plumsRouter);

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
