import express, { Response, Request } from 'express';

import accountRouter from './routes/account';

const app = express();
require('dotenv').config();
app.use(express.json())

app.get('/', (req : Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
