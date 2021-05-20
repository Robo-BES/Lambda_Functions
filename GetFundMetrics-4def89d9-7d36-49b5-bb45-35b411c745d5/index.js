const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {

    console.log(event);

    var params = {
        TableName: 'FundMetrics-65e776yxknfzlddagx47d36qku-staging',
        KeyConditionExpression: 'code = :code and #date >= :date',
        ExpressionAttributeValues: {
            ':code': event.queryStringParameters.code,
            ':date': Number(event.queryStringParameters.date)
        },
        ExpressionAttributeNames: {
            '#date': 'date'
        }
    };

    var results = await dynamo.query(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(results),
        headers: {
            "content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        }
    };
    return response;
};
