const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const restaurantId = event.pathParameters?.restaurantId;

    if (!restaurantId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Restaurant ID is required' })
      };
    }

    const params = {
      TableName: 'Restaurants',
      Key: {
        RestaurantID: restaurantId
      }
    };

    const result = await ddbDocClient.send(new GetCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Restaurant not found' })
      };
    }

    // Return restaurant data without password
    const { Password, ...restaurantData } = result.Item;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ restaurant: restaurantData })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
