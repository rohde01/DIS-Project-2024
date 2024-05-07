const express = require('express');
const app = express();
const LinechartRouter = require('./routes/linechart');

app.use('/customer', LinechartRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});