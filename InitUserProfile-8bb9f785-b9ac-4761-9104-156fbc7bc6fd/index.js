const AWS = require('aws-sdk');
var ses = new AWS.SES({ region: "eu-central-1" });

exports.handler = async(event, context) => {

  if (event.triggerSource == 'PostConfirmation_ConfirmForgotPassword') {
    context.done(null, event);
  }

  var userattributes = event.request.userAttributes;

  console.log(event);
  console.log(context);

  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  try {
    await documentClient.put({
    TableName: 'Users',
    Item: {
      UserId: userattributes['sub'],
      Name: userattributes['name'],
      Email: userattributes['email'],
      date: new Date().getTime(),
      Portfolios: []
    }
  }).promise();
  } catch (e) {
    console.log(e);
  }
  


  context.done(null, event);
};
