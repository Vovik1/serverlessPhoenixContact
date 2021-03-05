const serverless = require('serverless-http')
const express = require('express')

const apiRouter = require('./api/routes/index');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* const PLC_TABLE = process.env.PLC_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();*/

app.use('/api', apiRouter);

/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

module.exports.handler = serverless(app);
