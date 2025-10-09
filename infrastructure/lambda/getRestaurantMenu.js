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
    const restaurantId = event.pathParameters?.restaurantId || event.queryStringParameters?.restaurantId;

    if (!restaurantId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Restaurant ID is required' })
      };
    }

    // Query menu items from RestaurantMenuOptimized table
    const params = {
      TableName: 'RestaurantMenuOptimized',
      FilterExpression: 'RestaurantID = :restaurantId',
      ExpressionAttributeValues: {
        ':restaurantId': restaurantId
      }
    };

    const result = await ddbDocClient.send(new ScanCommand(params));

    // If no items found in RestaurantMenuOptimized, try cnres0_menu
    let menuItems = result.Items || [];

    if (menuItems.length === 0) {
      const cnresParams = {
        TableName: 'cnres0_menu',
        FilterExpression: 'RestaurantID = :restaurantId',
        ExpressionAttributeValues: {
          ':restaurantId': restaurantId
        }
      };

      const cnresResult = await ddbDocClient.send(new ScanCommand(cnresParams));
      menuItems = cnresResult.Items || [];
    }

    // Calculate statistics
    const stats = {
      totalItems: menuItems.length,
      categories: [...new Set(menuItems.map(item => item.Category || item.DishCategory).filter(Boolean))],
      averagePrice: menuItems.length > 0
        ? (menuItems.reduce((sum, item) => sum + (parseFloat(item.Price || item.UnitPrice) || 0), 0) / menuItems.length).toFixed(2)
        : 0
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        menuItems,
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
