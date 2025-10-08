const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');

const client = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,PUT',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const restaurantId = event.pathParameters?.restaurantId;
    const body = JSON.parse(event.body);

    if (!restaurantId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Restaurant ID is required' })
      };
    }

    // Check if restaurant exists
    const getParams = {
      TableName: 'Restaurants',
      Key: {
        RestaurantID: restaurantId
      }
    };

    const existing = await ddbDocClient.send(new GetCommand(getParams));

    if (!existing.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Restaurant not found' })
      };
    }

    // Build update expression
    let updateExpression = 'SET UpdatedAt = :updatedAt';
    const expressionAttributeValues = {
      ':updatedAt': new Date().toISOString()
    };
    const expressionAttributeNames = {};

    // Add fields to update
    const allowedFields = ['RestaurantName', 'Address', 'PhoneNumber', 'CuisineType', 'OpenHours'];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateExpression += `, #${field} = :${field}`;
        expressionAttributeNames[`#${field}`] = field;
        expressionAttributeValues[`:${field}`] = body[field];
      }
    });

    // Handle password update separately
    if (body.newPassword) {
      updateExpression += ', #Password = :password';
      expressionAttributeNames['#Password'] = 'Password';
      expressionAttributeValues[':password'] = hashPassword(body.newPassword);
    }

    const params = {
      TableName: 'Restaurants',
      Key: {
        RestaurantID: restaurantId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ReturnValues: 'ALL_NEW'
    };

    const result = await ddbDocClient.send(new UpdateCommand(params));

    // Return updated restaurant data without password
    const { Password, ...restaurantData } = result.Attributes;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Restaurant updated successfully',
        restaurant: restaurantData
      })
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
