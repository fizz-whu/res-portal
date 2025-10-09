#!/bin/bash

REGION="us-west-2"
API_NAME="RestaurantPortalAPI"
ACCOUNT_ID="495599767527"

echo "Creating REST API..."
API_ID=$(aws apigateway create-rest-api \
  --name "$API_NAME" \
  --description "API for Restaurant Portal" \
  --endpoint-configuration types=REGIONAL \
  --region $REGION \
  --query 'id' \
  --output text)

echo "API created with ID: $API_ID"

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --region $REGION \
  --query 'items[0].id' \
  --output text)

echo "Root resource ID: $ROOT_ID"

# Create /restaurants resource
RESTAURANTS_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part restaurants \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created /restaurants resource: $RESTAURANTS_ID"

# Create /restaurants/register resource
REGISTER_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $RESTAURANTS_ID \
  --path-part register \
  --region $REGION \
  --query 'id' \
  --output text)

# Create /restaurants/login resource
LOGIN_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $RESTAURANTS_ID \
  --path-part login \
  --region $REGION \
  --query 'id' \
  --output text)

# Create /restaurants/{restaurantId} resource
RESTAURANT_ID_RESOURCE=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $RESTAURANTS_ID \
  --path-part '{restaurantId}' \
  --region $REGION \
  --query 'id' \
  --output text)

# Create /restaurants/{restaurantId}/orders resource
ORDERS_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $RESTAURANT_ID_RESOURCE \
  --path-part orders \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created all resources"

# Function to create method and integration
create_method() {
  RESOURCE_ID=$1
  HTTP_METHOD=$2
  LAMBDA_FUNCTION=$3

  echo "Creating $HTTP_METHOD method for $LAMBDA_FUNCTION..."

  # Create method
  aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method $HTTP_METHOD \
    --authorization-type NONE \
    --region $REGION

  # Create integration
  aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method $HTTP_METHOD \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${LAMBDA_FUNCTION}/invocations" \
    --region $REGION

  # Add Lambda permission
  aws lambda add-permission \
    --function-name $LAMBDA_FUNCTION \
    --statement-id "apigateway-${LAMBDA_FUNCTION}-${HTTP_METHOD}" \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*/${HTTP_METHOD}/*" \
    --region $REGION 2>/dev/null || true

  # Enable CORS
  aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --authorization-type NONE \
    --region $REGION 2>/dev/null || true

  aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --type MOCK \
    --request-templates '{"application/json": "{\"statusCode\": 200}"}' \
    --region $REGION 2>/dev/null || true

  aws apigateway put-method-response \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --status-code 200 \
    --response-parameters '{"method.response.header.Access-Control-Allow-Headers": true, "method.response.header.Access-Control-Allow-Methods": true, "method.response.header.Access-Control-Allow-Origin": true}' \
    --region $REGION 2>/dev/null || true

  aws apigateway put-integration-response \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --status-code 200 \
    --response-parameters '{"method.response.header.Access-Control-Allow-Headers": "'\''Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'\''", "method.response.header.Access-Control-Allow-Methods": "'\''GET,POST,PUT,DELETE,OPTIONS'\''", "method.response.header.Access-Control-Allow-Origin": "'\''*'\''"}' \
    --region $REGION 2>/dev/null || true
}

# Create methods and integrations
create_method $REGISTER_ID "POST" "RegisterRestaurant"
create_method $LOGIN_ID "POST" "AuthenticateRestaurant"
create_method $RESTAURANT_ID_RESOURCE "GET" "GetRestaurant"
create_method $RESTAURANT_ID_RESOURCE "PUT" "UpdateRestaurant"
create_method $ORDERS_ID "GET" "ListOrders"

echo "Creating deployment..."
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod \
  --region $REGION

echo ""
echo "API Gateway created successfully!"
echo "API ID: $API_ID"
echo "Base URL: https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod"
echo ""
echo "Endpoints:"
echo "  POST   /restaurants/register"
echo "  POST   /restaurants/login"
echo "  GET    /restaurants/{restaurantId}"
echo "  PUT    /restaurants/{restaurantId}"
echo "  GET    /restaurants/{restaurantId}/orders"
echo ""

# Save API URL to a file for frontend to use
echo "https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod" > /Users/fizz/work/res-portal/src/config/api-url.txt
echo "API URL saved to src/config/api-url.txt"
