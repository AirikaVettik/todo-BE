const express = require('express')
const router = express.Router()

const { getTodoTasks, getDoneTasks, createTask, moveTask, getAllTasks, deleteToDoTask, deleteDoneTask, createUser, getAllUsers, downloadFile } = require('./controllers')

router.get('/todo-tasks', getTodoTasks)
router.get('/done-tasks', getDoneTasks)
// id is mongo object _id and toTask is todo or done
router.get('/moveTask/:id/:toTask', moveTask)
router.post('/createTask', createTask)
router.get('/all-tasks', getAllTasks)
router.delete('/done-tasks/:id', deleteDoneTask),
router.delete('/todo-tasks/:id', deleteToDoTask),
router.post('/user', createUser),
router.get('/all-users', getAllUsers)

router.post('/downloadFile', downloadFile),
module.exports = router
