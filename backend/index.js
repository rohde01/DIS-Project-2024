const express = require('express');
const app = express();
const customerRouter = require('./routes/customer'); // make sure the path is correct

app.use('/customer', customerRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});