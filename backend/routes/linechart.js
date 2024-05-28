const express = require('express');
const cors = require('cors');
const LinechartRouter = express.Router();
const getCustomerData = require('../queries/user-stats');

LinechartRouter.get('/data', cors(), async (req, res) => {
  try {
    const filterParams = req.query;

    const data = await getCustomerData(filterParams);
    
    const sortedData = data.sort((a, b) => new Date(a.CreatedOnUtc) - new Date(b.CreatedOnUtc));

    let count = 0;

    const processed = sortedData.map(entry => ({
      date: new Date(entry.CreatedOnUtc),
      value: ++count
    }));


    res.json(processed);
  } catch (err) {
    console.error('Failed to fetch customer data:', err);
    res.status(500).send('Failed to fetch customer data');
  }
});

module.exports = LinechartRouter;