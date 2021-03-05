const AWS = require('aws-sdk');
const PLC_TABLE = process.env.PLC_TABLE;
const Dynamo = require('../../common/Dynamo');

async function getAll(req, res) {
    const params = {
        TableName: PLC_TABLE,
        KeyConditionExpression: "plc_id = :id and #tmp between :t1 and :t2",
        ExpressionAttributeNames: {
            "#tmp": "timestamp"
        },
        ExpressionAttributeValues: {
            ":id": '4',
            ":t1": "2021-03-04T16:57:50.204Z",
            ":t2": "2021-03-04T17:08:19.495Z"
        }
    }

    try {
        const result = await Dynamo.queryData(params)
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
}


module.exports = { getAll }