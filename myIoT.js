const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    const tableName = 'myPLC'
    const item = {
        timestamp: Date.now(),
        temperature: event
    };

    const params = {
        TableName: tableName,
        Item: item
    }

    db.put(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    })
}