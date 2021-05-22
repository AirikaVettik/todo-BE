module.exports = {
  createTask: require('./createTask.controller'),
  getTodoTasks: require('./getTodoTasks.controller'),
  getDoneTasks: require('./getDoneTasks.controller'),
  moveTask: require('./moveTask.controller'),
  getAllTasks: require('./getAllTasks.controller'),
  deleteToDoTask: require('./deleteToDoTask.controller'),
  deleteDoneTask: require('./deleteDoneTask.controller'),
  createUser: require('./user.controller'),
  getAllUsers: require('./getAllUsers.controller'),
  downloadFile: require('./downloadFile.controller'),
  getTasksCreatedBy: require('./getTasksCreatedBy.controller')
}
