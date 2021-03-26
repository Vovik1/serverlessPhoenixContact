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

async function getLatest(req, res) {

    const params = {
        TableName: PLC_TABLE,
        KeyConditionExpression: "plc_id = :id",
        ExpressionAttributeValues: {
            ":id": '1151412'
        },
        ScanIndexForward: false,
        Limit: 1,
    }

    try {
        const result = await Dynamo.queryData(params)
        const {operationalData, plc_id, timestamp} = result.Items[0];
        res.json({
            operationalData:operationalData,
            plc_id:plc_id,
            timestamp:timestamp
        });
    }
    catch (err) {
        res.json(err);
    }

}

async function getTemperatureChartData(req, res) {
    const params = {
        TableName: PLC_TABLE,
        KeyConditionExpression: "plc_id = :id",
        ExpressionAttributeValues: {
            ":id": '1151412'
        },
        ScanIndexForward: true,
        Limit: 30,
    }

    try {
        const result = await Dynamo.queryData(params)
        const data = result.Items.map((item) => {
            return {
                timestamp: item.timestamp,
                heaterTemperature: item.operationalData.HEATER_TEMPERATURE,
                tankTemperature: item.operationalData.TANK_TEMPERATURE
            }
        })

        const convertedResults = {
            timestamp: [],
            heaterTemperature: [],
            tankTemperature: [],
        };

        for (let i = 0; i < data.length; i++) {
            convertedResults.timestamp.push(data[i].timestamp)
            convertedResults.heaterTemperature.push(data[i].heaterTemperature)
            convertedResults.tankTemperature.push(data[i].tankTemperature)
        }

        res.json(convertedResults);
    }
    catch (err) {
        res.json(err);
    }
}


module.exports = { getAll, getLatest, getTemperatureChartData }