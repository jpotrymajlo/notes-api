import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId" : event.requestContext.identity.cognitoIdentityId
        }
    };

    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
    };

    try {
        const result = await dynamoDb.get(params).promise();

        return {
            statusCode: 200,
            headers: headers,
            body: result.Items
        }
    } catch (err) {

        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({error: err})
        };
    }

};