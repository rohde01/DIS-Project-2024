const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const LinechartRouter = require('./routes/linechart');
const TeamListRouter = require('./routes/teamlist');
const CreateCustomer = require('./queries/create-user');
const UpdateTeamUsers = require('./queries/update-team-users');
const DeleteTeams = require('./queries/delete-team'); 

const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

// Middleware
app.use(bodyParser.json());

app.use('/customer', LinechartRouter);
app.use('/team', TeamListRouter);

// Route to handle user creation
app.post('/create-user', async (req, res) => {
    const userData = req.body;
    console.log('Received payload:', userData);

    try {
        const result = await CreateCustomer(userData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Route to handle user updates based on teamid
app.post('/update-team-users', async (req, res) => {
    const teamUserData = req.body;
    console.log('Received update payload:', teamUserData);

    try {
        const result = await UpdateTeamUsers(teamUserData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error updating users', error: error.message });
    }
});

// Route to handle team deletion based on teamid
app.post('/delete-teams', async (req, res) => {
    const { TeamIdList } = req.body;  // Destructure TeamIdList from the request body
    console.log('Received delete payload:', TeamIdList);

    try {
        const result = await DeleteTeams(TeamIdList);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teams', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});