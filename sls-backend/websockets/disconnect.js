const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event)

    const { connectionId: connectioID } = event.requestContext;

    await Dynamo.delete(connectioID, tableName)

    return Responses._200({ message: 'disconnected' });
}