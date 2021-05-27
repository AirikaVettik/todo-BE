const db = require('../db')
const User = db.User

module.exports = async function (req, res) {
  try {
    const result = [
      await User.find({}).lean().exec()
    ]
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
