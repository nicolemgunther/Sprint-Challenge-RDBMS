const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// basic gets

server.get('/api/projects', (req, res) => {
    db('projects')
        .then(projects => {
            if (projects.length === 0) {
                res.status(404).json({ message: 'There are no projects here. Please add one to the database to see the projects array.' });
            }

            else res.status(200).json(projects);
        })

        .catch(error => {
            console.log(error);

            res.status(500).json({ error: "Some useful error message" });
        });
});

server.get('/api/actions', (req, res) => {
    db('actions')
        .then(actions => {
            if (actions.length === 0) {
                res.status(404).json({ message: 'There are no actions here. Please add one to the database to see the actions array.' });
            }

            else res.status(200).json(actions);
        })

        .catch(error => {
            console.log(error);

            res.status(500).json({ error: "Some useful error message" });
        });
});

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

        .then(action => {
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

// get projects/:id

server.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;

    db('projects')
        .where({ id: projectId })

        .first()

        .then(project => {
            if (!project) {
                res.status(404).json({ message: 'No project with that ID exists.' });
            }

            else {
                db('actions')
                    .where({ project_id: projectId })

                    .then(actions => {
                        project.actions = actions;

                        res.status(200).json(project);
                    });
            }
        })

        .catch(error => {
            console.log(error);

            res.status(500).json({ error: "Some useful error message" });
        });
});

// server listen

const port = 4000;
server.listen(port, function() {
    console.log(`API running on http://localhost:${port}`);
});