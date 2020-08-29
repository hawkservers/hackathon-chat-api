import express from 'express';
import Config from '../config.json';

const app = express();

app.get('/api/test', (req, res) => {
  res.send('test');
})

app.listen(Config.app.port, () => {
  console.log(`Example app listening on ${Config.app.port}`)
})
