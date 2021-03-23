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
        res.json(result.Items);
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
        ScanIndexForward: false,
        Limit: 30,
    }

    try {
        const result = await Dynamo.queryData(params)
        const data = result.Items.map((item) => {
            return {
                timestamp: item.timestamp,
                heater_temperature: item.data.HEATER_TEMPERATURE,
                tank_level: item.data.TANK_LEVEL
            }
        })

        console.log("Data", data)
        const converted_results = {
            timestamp: [],
            heater_temperature: [],
            tank_level: [],
        };

        for (let i = 0; i < data.length; i++) {
            converted_results.timestamp.push(data[i].timestamp)
            converted_results.heater_temperature.push(data[i].heater_temperature)
            converted_results.tank_level.push(data[i].tank_level)
        }

        res.json(converted_results);
    }
    catch (err) {
        res.json(err);
    }
}


module.exports = { getAll, getLatest, getTemperatureChartData }