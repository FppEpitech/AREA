import express, { Response, Request } from 'express';
import dotenv from 'dotenv';
import { updateCronJob, checkCronResultJob } from './cron/UpdateCron';
import cors from 'cors';
import plumsRouter from './routes/plums';
import * as path from 'path';
import accountRouter from './routes/account';
import triggerRouter from './routes/trigger';
import actionRouter from './routes/action';
import aboutRouter from './routes/about';
import swaggerDocs from './docs/swagger';

const swaggerUi = require("swagger-ui-express");

dotenv.config();

//TODO: run the scrips to create the trigger and action templates


checkCronResultJob.start();
updateCronJob.start();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.use('/plums', plumsRouter);
app.use('/actions', actionRouter);
app.use('/triggers', triggerRouter);
app.use('/account', accountRouter);
app.use('/about.json', aboutRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/client.apk', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Disposition', 'attachment; filename="client.apk"');
  res.sendFile(path.join('/shared/client.apk'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
