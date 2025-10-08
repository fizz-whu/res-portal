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

    // Query orders for this restaurant
    // Note: If RestaurantID is added to orders table, we can use Query instead of Scan
    const params = {
      TableName: 'cnres0_orders',
      FilterExpression: 'RestaurantID = :restaurantId',
      ExpressionAttributeValues: {
        ':restaurantId': restaurantId
      }
    };

    const result = await ddbDocClient.send(new ScanCommand(params));

    // If no RestaurantID in orders yet, return all orders for demo
    // In production, orders should have RestaurantID field
    let orders = result.Items || [];

    // Sort by timestamp (most recent first)
    orders.sort((a, b) => {
      const timeA = new Date(a.Timestamp || 0);
      const timeB = new Date(b.Timestamp || 0);
      return timeB - timeA;
    });

    // Calculate statistics
    const stats = {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.Status === 'Pending').length,
      completedOrders: orders.filter(o => o.Status === 'Completed').length,
      totalRevenue: orders.reduce((sum, o) => sum + (parseFloat(o.Total) || 0), 0)
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        orders: orders,
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
