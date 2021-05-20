const AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    console.log(JSON.parse(event.body));
    
    var body = JSON.parse(event.body);
    
    var score = body.form_response.calculated.score;
    
    var userid = body.form_response.hidden.userid;
    
    var portfolioToAdd;
    
    var now = new Date();
    
    var todaysEpoch = new Date(now.toLocaleDateString()).getTime();
    
    todaysEpoch = todaysEpoch / 1000;
    
    if(score <= 19){
        portfolioToAdd = {
            'model_type': 'min_volatility',
            'date': todaysEpoch
        };
    }else{
        portfolioToAdd = {
            'model_type': 'max_sharpe_ratio',
            'date': todaysEpoch
        };
    }
    
    var params = {
        TableName: 'Users',
            Key: {
                'UserId': userid,
            },
            UpdateExpression: "SET Portfolios = list_append(Portfolios, :portfolio)",
            ConditionExpression: 'attribute_exists(UserId)',
            ReturnValues: 'UPDATED_NEW',
            ExpressionAttributeValues: {
                ":portfolio": [portfolioToAdd],
            },
        };
        try {
            var res = await dynamo.update(params).promise();
            console.log(res);
        }
        catch (e) {
            console.log(e);
        }
    
    const response = {
        statusCode: 200,
    };
    return response;
};
