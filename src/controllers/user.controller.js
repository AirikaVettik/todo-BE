const db = require('./../db')
const User = db.User

module.exports = async function (req, res) {
  try {
    await User.create(req.body)
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}