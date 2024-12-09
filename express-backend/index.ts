import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { InitCron } from './cron/CronInit';
import * as path from 'path';

import accountRouter from './routes/account';

dotenv.config();

InitCron();

const app = express();
app.use(express.json());

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/about.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.json'));
});

app.use('/client.apk', express.static(path.join(__dirname, '/shared')));

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
