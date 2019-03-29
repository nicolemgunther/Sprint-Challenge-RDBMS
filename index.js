const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// post projects

server.post('/api/projects', (req, res) => {
    const projectDetails = req.body;

    db.insert(projectDetails)
        .into('projects')

        .then(project => {
            res.status(201).json(projectDetails);
        })

        .catch(error => {
            if (!projectDetails.name || !projectDetails.description) {
                res.status(400).json({ message: 'Please enter both a name and description for the project.' });
            }

            else {
                console.log(error);

                res.status(500).json({ error: "Some useful error message" });
            }
        });
});

// post actions

server.post('/api/actions', (req, res) => {
    const actionDetails = req.body;

    db.insert(actionDetails)
        .into('actions')

        .then(project => {
            res.status(201).json(actionDetails);
        })

        .catch(error => {
            if (!actionDetails.description || !actionDetails.notes || !actionDetails.project_id) {
                res.status(400).json({ message: 'Please enter a project ID, description and notes for the action.' });
            }

            else {
                console.log(error);

                res.status(500).json({ error: "Some useful error message" });
            }
        });
});

// server listen

const port = 4000;
server.listen(port, function() {
    console.log(`API running on http://localhost:${port}`);
});