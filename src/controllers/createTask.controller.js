const db = require('./../db')
const Todo = db.Todo

module.exports = async function (req, res) {
  try {
    await Todo.create(req.body)
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
