const AWS = require('aws-sdk');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.PLC_TABLE;

exports.handler = async event => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const item = {
        plc_id: '1151412',
        timestamp: new Date().toISOString(),
        data: event
    };

    await Dynamo.write(item, tableName)

};
