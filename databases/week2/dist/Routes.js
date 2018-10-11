'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _database = require('./database/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.get('/', (req, res) => {
    res.send('Lets dance all night!');
})

//A get request for all the info in the task table.
.get('/allTasks', (req, res) => {

    _database2.default.getAllTasks().then(result => {
        res.send(result);
    });
})

//A post request to add a task.
.post('/addTask', (req, res) => {

    const { title, description, created, updated, dueDate, statusID, userID } = req.body;

    _database2.default.addTask(title, description, created, updated, dueDate, statusID, userID).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A put request for updating a task title
.put('/changeTaskTitle/:taskID', (req, res) => {

    _database2.default.changeTaskTitle(req.params.taskID, req.body.newTitle).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A put request for updating a task due date
.put('/changeDueDate/:taskID', (req, res) => {

    _database2.default.changeTaskTitle(req.params.taskID, req.body.newDate).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A put request for updating a task status
.put('/changeStatus/:taskID', (req, res) => {

    _database2.default.changeTaskStatus(req.params.taskID, req.body.newStatus).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A put request for marking a task as complete.
.put('/markAsCompleted/:taskID', (req, res) => {

    _database2.default.markTaskAsCompleted(req.params.taskID).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A delete request for deleting a task
.delete('/deleteTask/:taskID', (req, res) => {

    _database2.default.deleteTask(req.params.taskID).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
})

//A delete request for deleting a task
.delete('/deleteUser/:userID', (req, res) => {

    _database2.default.deleteUser(req.params.userID).then(result => {
        res.send(result);
    }).catch(error => {
        throw error;
    });
});

exports.default = routes;
//# sourceMappingURL=Routes.js.map