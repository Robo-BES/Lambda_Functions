const Twilio = require('twilio');
const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
// Used when generating any kind of tokens
const twilioAccountSid = "ACf6b8ce8aac0d184c2485c6d31c75f327";
const twilioApiKey = "SKce4fd97f871a842df99f3f1a9770030b";
const twilioApiSecret = "XCCiCzGvMsKVQnwdDh8N4fiprRWOZQTo";
const authToken = "be870c88fda747353b28f496598c902c";


exports.handler = async function (event, context) {
    // Used specifically for creating Chat tokens
    //const serviceSid = "IS111e769f55e84c8ab42f9f2fc15cbaaa";
    // const identity = '41226cd2-0aaa-431c-b5f1-b17095653180';
    // // Create a "grant" which enables a client to use Chat as a given user,
    // // on a given device
    // const chatGrant = new ChatGrant({
    //     serviceSid: serviceSid,
    // });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    // const token = new AccessToken(
    //     twilioAccountSid,
    //     twilioApiKey,
    //     twilioApiSecret,
    //     { identity: identity }
    // );

    // token.addGrant(chatGrant);

    // Serialize the token to a JWT string
    await Twilio(twilioAccountSid, authToken).conversations.conversations
                    .create({friendlyName: 'Test'})
                    .then(conversation => console.log(conversation));
    // this.conversationsClient.on("connectionStateChanged", (state) => {
    //     if (state === "connecting")
    //         console.log(state);
    //     if (state === "connected") {
    //         console.log(state);


    //         // this.conversationsClient.createConversation({
    //         //     friendlyName: 'Test'
    //         // }).then(conversation => { console.log(conversation.sid); });
    //     }
    //     if (state === "disconnecting")
    //         console.log(state);
    //     if (state === "disconnected")
    //         console.log(state);
    //     if (state === "denied")
    //         console.log(state);
    // });
    
    return;
}

exports.handler()