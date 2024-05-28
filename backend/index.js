const express = require('express');
const app = express();
const LinechartRouter = require('./routes/linechart');
const TeamListRouter = require('./routes/teamlist');

app.use('/customer', LinechartRouter);
app.use('/team', TeamListRouter); // This is correct

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
