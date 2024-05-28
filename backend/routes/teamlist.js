const express = require('express');
const cors = require('cors');
const teamlistrouter = express.Router();
const getTeamList = require('../queries/team-list');

teamlistrouter.get('/', cors(), async (req, res) => {
  try {
    const data = await getTeamList();
    res.json(data); 
  } catch (err) {
    console.error('Failed to fetch team data:', err); 
    res.status(500).send('Failed to fetch team data'); 
  }
});

module.exports = teamlistrouter;
