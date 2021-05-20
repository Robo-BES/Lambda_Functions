const AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async(event) => {
    
    var userId = event.requestContext.authorizer.claims.sub;
    
    console.log(event);

    var params = {
        TableName: 'Users',
        Key: {
            UserId: userId
        }
    };

    var result = await documentClient.get(params).promise();
    
    var keys = result.Item.Portfolios;
    
    console.log(keys);
    
    var portfolios = [];
    
    for(var key of keys){
        var params = {
            TableName: 'ModelPredictions',
            Key: key
        };
        portfolios.push(await documentClient.get(params).promise());
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(portfolios),
        headers: {
            "content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        }
    };
    return response;
};
