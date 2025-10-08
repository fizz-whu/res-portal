const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');

const client = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Simple password hashing (in production, use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate unique restaurant ID
function generateRestaurantId() {
  return 'REST-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const { restaurantName, address, phoneNumber, cuisineType, email, password } = body;

    // Validate required fields
    if (!restaurantName || !address || !phoneNumber || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Check if email already exists
    const checkEmailParams = {
      TableName: 'Restaurants',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'Email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    };

    const existingRestaurant = await ddbDocClient.send(new QueryCommand(checkEmailParams));

    if (existingRestaurant.Items && existingRestaurant.Items.length > 0) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: 'Email already registered' })
      };
    }

    // Create restaurant
    const restaurantId = generateRestaurantId();
    const hashedPassword = hashPassword(password);

    const restaurant = {
      RestaurantID: restaurantId,
      RestaurantName: restaurantName,
      Address: address,
      PhoneNumber: phoneNumber,
      CuisineType: cuisineType || 'Not specified',
      Email: email,
      Password: hashedPassword,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      Status: 'Active',
      OpenHours: 'Mon-Fri: 11 AM - 10 PM\nSat-Sun: 10 AM - 11 PM'
    };

    const params = {
      TableName: 'Restaurants',
      Item: restaurant
    };

    await ddbDocClient.send(new PutCommand(params));

    // Return restaurant data without password
    const { Password, ...restaurantData } = restaurant;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'Restaurant registered successfully',
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
