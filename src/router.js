const express = require('express')
const router = express.Router()

const { 
    getTodoTasks, 
    getDoneTasks, 
    createTask, 
    moveTask, 
    getAllTasks, 
    deleteToDoTask, 
    deleteDoneTask, 
    createUser, 
    getAllUsers, 
    downloadFile,
    getTasksCreatedBy } = require('./controllers')

router.get('/all-tasks', getAllTasks)
router.get('/todo-tasks', getTodoTasks)
router.get('/done-tasks', getDoneTasks)
router.get('/all-tasks/:createdBy', getTasksCreatedBy)

router.get('/moveTask/:id/:toTask', moveTask)

router.post('/createTask', createTask)

router.delete('/done-tasks/:id', deleteDoneTask),
router.delete('/todo-tasks/:id', deleteToDoTask),

router.post('/user', createUser),
router.get('/all-users', getAllUsers),

router.post('/downloadFile', downloadFile),

module.exports = router
