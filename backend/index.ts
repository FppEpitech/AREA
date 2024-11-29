import express from 'express';

const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server : http://localhost:${process.env.PORT}`);
});
