const express = require('express');
const router = express.Router();
const getCustomerData = require('../queries/user-stats');

router.get('/data', async (req, res) => {
  try {
    const data = await getCustomerData();
    res.json(data);
  } catch (err) {
    console.error('Failed to fetch customer data:', err);
    res.status(500).send('Failed to fetch customer data');
  }
});

module.exports = router;