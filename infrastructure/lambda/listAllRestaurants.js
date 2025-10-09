const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

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
    // In production, add authentication/authorization here
    // For now, this is an open endpoint for admin access

    const params = {
      TableName: 'Restaurants'
    };

    const result = await ddbDocClient.send(new ScanCommand(params));

    // Remove passwords from response
    const restaurants = (result.Items || []).map(restaurant => {
      const { Password, ...restaurantData } = restaurant;
      return restaurantData;
    });

    // Sort by creation date (most recent first)
    restaurants.sort((a, b) => {
      const dateA = new Date(a.CreatedAt || 0);
      const dateB = new Date(b.CreatedAt || 0);
      return dateB - dateA;
    });

    // Calculate statistics
    const stats = {
      totalRestaurants: restaurants.length,
      activeRestaurants: restaurants.filter(r => r.Status === 'Active').length,
      cuisineTypes: [...new Set(restaurants.map(r => r.CuisineType).filter(Boolean))]
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        restaurants,
        statistics: stats
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
