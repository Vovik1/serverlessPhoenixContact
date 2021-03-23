const serverless = require('serverless-http')
const express = require('express')
const cors = require(`cors`);

const apiRouter = require('./api/routes/index');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Expose-Headers');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});


app.use(cors());
app.use('/api', apiRouter);

module.exports.handler = serverless(app);
