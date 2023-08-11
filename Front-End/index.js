const express = require('express');
const app = express();
const db = require('./db');

app.get('/', (req, res) => {
  res.send('Hello from Next.js!');
});

app.listen(3000);