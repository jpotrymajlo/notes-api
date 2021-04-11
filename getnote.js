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
        const result = await dynamoDb.get(params).promise();

        if (result.Item){
            return  {
                statusCode: 200,
                headers: headers,
                body: result.Item
            };
        } else {
            return  {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({error: "item not found"})
            };
        };
    }
    catch (err)
    {
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({error: err})
        };
    }

};
