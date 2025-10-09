# Restaurant Portal Backend Infrastructure

This directory contains the AWS infrastructure for the Restaurant Portal application.

## Architecture Overview

### DynamoDB Tables

1. **Restaurants** - Stores restaurant profile information
   - Primary Key: `RestaurantID` (String)
   - Global Secondary Index: `EmailIndex` on `Email`
   - Attributes: RestaurantName, Address, PhoneNumber, CuisineType, Email, Password (hashed), CreatedAt, UpdatedAt, Status, OpenHours

2. **cnres0_orders** - Stores orders from Amazon Lex bot CnRes001
   - Primary Key: `OrderID` (String)
   - Sort Key: `Timestamp` (String)
   - Note: Orders should include `RestaurantID` field to match with registered restaurants

### Lambda Functions

1. **RegisterRestaurant** - Handle restaurant registration
   - Endpoint: POST /restaurants/register
   - Creates new restaurant with unique RestaurantID

2. **AuthenticateRestaurant** - Handle restaurant login
   - Endpoint: POST /restaurants/login
   - Validates credentials and returns restaurant data

3. **GetRestaurant** - Retrieve restaurant profile
   - Endpoint: GET /restaurants/{restaurantId}
   - Returns restaurant information

4. **UpdateRestaurant** - Update restaurant profile
   - Endpoint: PUT /restaurants/{restaurantId}
   - Updates restaurant information

5. **ListOrders** - List orders for a restaurant
   - Endpoint: GET /restaurants/{restaurantId}/orders
   - Returns all orders associated with the restaurant

### API Gateway

- **API Name**: RestaurantPortalAPI
- **Stage**: prod
- **Base URL**: https://tow0pwafhh.execute-api.us-west-2.amazonaws.com/prod
- **Region**: us-west-2

#### Endpoints

```
POST   /restaurants/register
POST   /restaurants/login
GET    /restaurants/{restaurantId}
PUT    /restaurants/{restaurantId}
GET    /restaurants/{restaurantId}/orders
```

### IAM Role

- **Role Name**: ResPortalLambdaExecutionRole
- **Policies**:
  - AWSLambdaBasicExecutionRole
  - AmazonDynamoDBFullAccess

## Deployment

### Prerequisites
- AWS CLI configured
- Node.js 20.x

### Deploy Lambda Functions

```bash
cd lambda
npm install
chmod +x ../deploy-lambdas.sh
../deploy-lambdas.sh
```

### Create API Gateway

```bash
chmod +x create-api-gateway.sh
./create-api-gateway.sh
```

## Integration with Lex Bot

The Restaurant Portal is designed to work with Amazon Lex bot **CnRes001** in us-west-2.

When a restaurant is registered, a unique `RestaurantID` is generated (format: `REST-{timestamp}-{random}`). This ID should be used when:

1. Orders are created through the Lex bot
2. The Lex bot stores orders in the `cnres0_orders` DynamoDB table
3. Orders include the `RestaurantID` field to associate them with the correct restaurant

## Security Considerations

- Passwords are hashed using SHA-256 (consider using bcrypt in production)
- CORS is enabled for all origins (restrict in production)
- No authentication/authorization on API Gateway (add API keys or Cognito in production)

## Environment Variables

The API endpoint is stored in:
```
src/config/api-url.txt
src/config/api.js
```

## Monitoring

Lambda functions are configured with CloudWatch Logs:
- Log Group: `/aws/lambda/{FunctionName}`
- Retention: Default (never expire)
