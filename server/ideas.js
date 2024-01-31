const express = require('express');
const ideasRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');


ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const curIdea = getFromDatabaseById('ideas', ideaId);
    if (curIdea) {
        req.idea = curIdea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteAllFromDatabase('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});


module.exports = ideasRouter;