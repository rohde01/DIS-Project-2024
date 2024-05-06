const express = require('express');
const cors = require('cors');
const router = express.Router();
const getCustomerData = require('../queries/user-stats');

router.get('/data', cors(), async (req, res) => {
  try {
    const filterParams = req.query;
    const data = await getCustomerData(filterParams);
    res.json(data);
  } catch (err) {
    console.error('Failed to fetch customer data:', err);
    res.status(500).send('Failed to fetch customer data');
  }
});

module.exports = router;