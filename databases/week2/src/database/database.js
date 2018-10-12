import fs from 'fs';
import mysql from 'mysql';

const config = JSON.parse(fs.readFileSync(__dirname + '/config-secret.json'));

const { host, user, password, port, database } = config;

const connection = mysql.createConnection({
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
    })

    return new Promise((resolve, reject) => {
        this.query('SELECT * FROM task', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })

}

//A method to add a new task
connection.addTask = function (title, description, created, updated, dueDate, statusID, userID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject) => {

        this.query('INSERT INTO task (title, description, created, updated, due_date, status_id, user_id) VALUES(?,?,?,?,?,?,?)', [title, description, created, updated, dueDate, statusID, userID], (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

//A method for updating a task title
connection.changeTaskTitle = function (taskID, newTitle) {
    this.connect(() => {
        console.log('Connected to database');
    });
    return new Promise((resolve, reject) => {
        this.query('UPDATE task SET title = ? WHERE id = ?;', [newTitle, taskID], (error, result) => {
            if (error) reject(error)
            resolve(result)
        }
        )
    })
}

//A method for changing the due date of a task.
connection.changeTaskDueDate = function(taskID, newDueDate) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject)=>{
        console.log(newDueDate, 'and id', taskID);
        
        this.query('UPDATE task SET due_date = ? WHERE id = ? ;', [newDueDate, taskID], (error, result)=>{
            if (error) reject(error)
            resolve(result)
        })
    })
}

//A method for changing the status code of a task
connection.changeTaskStatus = function(taskID, newStatus) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject)=>{
        this.query('UPDATE task SET status_id = ? WHERE task.id = ?; ', [newStatus, taskID], (error, result)=>{
            if (error) reject(error)
            resolve(result)
        })
    })
};

//A method for marking a task as completed
connection.markTaskAsCompleted = function(taskID) {
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject)=>{
        this.query('UPDATE task SET status_id = 3 WHERE task.id = ?; ', [taskID], (error, result)=>{
            if (error) reject(error)
            resolve(result)
        })
    })
}

//A method for deleting a task
connection.deleteTask = function(taskID){
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject)=>{
        this.query('DELETE FROM task WHERE task.id = ?',[taskID], (error, result)=>{
            if (error) reject(error)
            resolve(result);
        })
    })
}

//A method for deleting an user
connection.deleteUser = function(userID){
    this.connect(() => {
        console.log('Connected to database');
    });

    return new Promise((resolve, reject)=>{
        this.query('DELETE FROM user WHERE user.id = ?',[userID], (error, result)=>{
            if (error) reject(error)
            resolve(result);
        })
    })
}


// Create a new database containing the following tables:
// Class: with the columns: id, name, begins (date), ends (date)
// Student: with the columns: id, name, email, phone, class_id (foreign key)

// CREATE DATABASE school;

// CREATE TABLE class(
//     ID INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     begins DATETIME  NOT NULL,
//     ends DATETIME,
//     PRIMARY KEY (ID)
// );

// CREATE TABLE student(
//     ID INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(320) NOT NULL,
//     phone INT,
//     class_ID INT NOT NULL,
//     PRIMARY KEY (ID),
//     FOREIGN KEY (class_ID ) REFERENCES class (ID)
// );

// Create an index on the name column of the student table.

// CREATE UNIQUE INDEX name_index
// ON student(name);

// Add a new column to the class table named status which can only have the following values: not-started, ongoing, finished (hint: enumerations).

// ALTER TABLE student
// ADD status SET("not-started", "ongoing", "finished") NOT NULL; 




export default connection
