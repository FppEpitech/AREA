import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(8081, () => {
  console.log('Server : http://localhost:8081');
});
