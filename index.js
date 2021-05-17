require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const router = require('./src/router')
const cors = require('cors')

app.use(cors({ exposedHeaders: 'Content-Disposition' }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hakkama said!')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
