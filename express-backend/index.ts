import express from 'express';

import accountRouter from './routes/account';

const app = express();
require('dotenv').config();
app.use(express.json())

app.get('/', (req : any, res: any) => {
  res.send('Hello, World!');
});

app.use('/account', accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
