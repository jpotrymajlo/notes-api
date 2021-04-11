import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            notesId: uuid.v1(),
            content: data.content,
            createAt: Date.now()
        }
    };

    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
    };

    try {
        await dynamoDb.put(params).promise();

        const responseOk = {
            statusCode: 200,
            headers: headers,
            body: params.Item
        };
        callback(null, responseOk);
    }
    catch (err){
        const responseFail = {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({error: err})
        };
        callback(null, responseFail);
    }
};
