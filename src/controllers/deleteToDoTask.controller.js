const db = require('./../db')
const Todo = db.Todo

module.exports = async function deleteToDoTask(req, res) {
  try {
    const taskID = req.params.id
    await Todo.deleteOne({'tasks._id': taskID }).lean()
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}