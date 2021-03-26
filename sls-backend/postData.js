const AWS = require('aws-sdk');
const iotdata = new AWS.IotData({ endpoint: 'aucehs89ofuch-ats.iot.eu-central-1.amazonaws.com' });
const Responses = require('./common/API_Responses');
const Dynamo = require('./common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    // if (!event.pathParameters || !event.pathParameters.ID) {
    //     // failed without an ID
    //     return Responses._400({ message: 'missing the ID from the path' });
    // }

    // let ID = event.pathParameters.ID;
    // const user = JSON.parse(event.body);
    // user.ID = ID;

    // const newUser = await Dynamo.write(user, tableName).catch(err => {
    //     console.log('error in dynamo write', err);
    //     return null;
    // });

    
    const params = {
        topic: 'writeOperationalParams',
        payload: event.body,
        qos: 0
    };
    try{
        const result = await iotdata.publish(params).promise();
        return Responses._200({ message: result });
    } catch (error) {
        return Responses._400({message: error})
    }    
};
