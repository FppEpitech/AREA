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

app.get('/client.apk', (req, res) => {
  const apkPath = path.join(__dirname, '..', 'shared', 'client.apk');  // Use shared volume path
  res.download(apkPath, 'client.apk', (err) => {
    if (err) {
      console.error("Error serving APK:", err);
      res.status(500).send("Error downloading the APK.");
    }
  });
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
