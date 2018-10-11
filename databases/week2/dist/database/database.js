'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = JSON.parse(_fs2.default.readFileSync(__dirname + '/config-secret.json'));

const { host, user, password, port, database } = config;

const connection = _mysql2.default.createConnection({
    host,
    user,
    password,
    port,
    database
});

//A method to get all the rows in the task table


connection.getAllTasks = function () {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        this.query('SELECT * FROM task', (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method to add a new task
connection.addTask = function (title, description, created, updated, dueDate, statusID, userID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {

        this.query('INSERT INTO task (title, description, created, updated, due_date, status_id, user_id) VALUES(?,?,?,?,?,?,?)', [title, description, created, updated, dueDate, statusID, userID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for updating a task title
connection.changeTaskTitle = function (taskID, newTitle) {
    this.connect(() => {
        console.log('Connected to database');
    });
    return new Promise((resolve, reject) => {
        this.query('UPDATE task SET title = ? WHERE id = ?;', [newTitle, taskID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for changing the due date of a task.
connection.changeTaskDueDate = function (taskID, newDueDate) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        console.log(newDueDate, 'and id', taskID);

        this.query('UPDATE task SET due_date = ? WHERE id = ? ;', [newDueDate, taskID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for changing the status code of a task
connection.changeTaskStatus = function (taskID, newStatus) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        this.query('UPDATE task SET status_id = ? WHERE task.id = ?; ', [newStatus, taskID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for marking a task as completed
connection.markTaskAsCompleted = function (taskID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        this.query('UPDATE task SET status_id = 3 WHERE task.id = ?; ', [taskID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for deleting a task
connection.deleteTask = function (taskID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        this.query('DELETE FROM task WHERE task.id = ?', [taskID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//A method for deleting an user
connection.deleteUser = function (userID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {
        this.query('DELETE FROM user WHERE user.id = ?', [userID], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

exports.default = connection;
//# sourceMappingURL=database.js.map