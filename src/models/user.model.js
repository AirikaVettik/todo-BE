const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    createdBy: { type: String, unique: true }
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('user', schema)
