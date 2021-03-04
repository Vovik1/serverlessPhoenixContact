const AWS = require('aws-sdk');
const PLC_TABLE = process.env.PLC_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function getAll(req, res) {
    console.log(req)
    const params = {
        TableName: PLC_TABLE,
        KeyConditionExpression: "#tmp = :yyyy",
        ExpressionAttributeNames: {
            "#tmp": "timestamp"
        },
        ExpressionAttributeValues: {
            ":yyyy": 1610011536319
        }
    }

    dynamoDb.query(params, (error, data) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get user' });
        } else {
            console.log("Query succeed");
            const values = data.Items.map((item) => {
                return {
                    time: item.timestamp,
                    temperature: item.temperature
                }
            })
            res.status(200).json(values);
        }
    });
}

module.exports = { getAll }