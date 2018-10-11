import { Router } from 'express';
import database from './database/database'

const routes = Router();

routes
    .get('/', (req, res) => {
        res.send('Should be working then')

    })

    //A get request for all the info in the task table.
    .get('/allTasks', (req, res) => {

        database.getAllTasks().then((result) => {
            res.send(result);
        })
    })

    //A post request to add a task.
    .post('/addTask', (req, res) => {

        const { title, description, created, updated, dueDate, statusID, userID } = req.body;

        database.addTask(title, description, created, updated, dueDate, statusID, userID)
            .then((result) => {
                res.send(result);
            })
            .catch((error)=>{throw error})
    })

    //A put request for updating a task title
    .put('/changeTaskTitle/:taskID', (req, res) => {

        database.changeTaskTitle(req.params.taskID, req.body.newTitle)

            .then((result) => {
                res.send(result);
            })
            .catch((error)=>{throw error})
    })

    //A put request for updating a task due date
    .put('/changeDueDate/:taskID', (req, res) => {
      
        database.changeTaskTitle(req.params.taskID, req.body.newDate)
            .then((result) => {
                res.send(result)
            })
            .catch((error)=>{throw error})
    })

    //A put request for updating a task status
    .put('/changeStatus/:taskID', (req, res)=>{

        database.changeTaskStatus(req.params.taskID, req.body.newStatus)
            .then((result) =>{
                res.send(result)
            })
            .catch((error)=>{throw error})
    })

    //A put request for marking a task as complete.
    .put('/markAsCompleted/:taskID', (req, res)=>{

        database.markTaskAsCompleted(req.params.taskID)
            .then((result) =>{
                res.send(result)
            })
            .catch((error)=>{throw error})
    })

    //A delete request for deleting a task
    .delete('/deleteTask/:taskID', (req,res)=>{
        
        database.deleteTask(req.params.taskID)
            .then((result)=>{
                res.send(result)
            })
            .catch((error)=>{throw error})
    })

        //A delete request for deleting a user
        .delete('/deleteUser/:userID', (req,res)=>{
        
            database.deleteUser(req.params.userID)
                .then((result)=>{
                    res.send(result)
                })
                .catch((error)=>{throw error})
        })

export default routes;
