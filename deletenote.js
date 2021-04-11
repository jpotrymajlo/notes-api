import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context) => {

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            notesId: event.pathParameters.id
        }
    };

    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
    };

    try {
        await dynamoDb.delete(params).promise();

        return  {
            statusCode: 200,
            headers: headers,
            body: {status: true}
        };


    } catch (err) {

        return  {
            statusCode: 200,
            headers: headers,
            body: {status: err}
        };
    }
};