require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const router = require('./src/router')
const cors = require('cors')


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hakkama said!')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
