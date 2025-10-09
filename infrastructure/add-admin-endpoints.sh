#!/bin/bash

REGION="us-west-2"
API_ID="tow0pwafhh"
ACCOUNT_ID="495599767527"

echo "Adding admin endpoints to API Gateway..."

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --region $REGION \
  --query 'items[?path==`/`].id' \
  --output text)

echo "Root resource ID: $ROOT_ID"

# Create /admin resource
echo "Creating /admin resource..."
ADMIN_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part admin \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created /admin resource: $ADMIN_ID"

# Create /admin/restaurants resource
echo "Creating /admin/restaurants resource..."
ADMIN_RESTAURANTS_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ADMIN_ID \
  --path-part restaurants \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created /admin/restaurants resource: $ADMIN_RESTAURANTS_ID"

# Create /admin/restaurants/{restaurantId} resource
echo "Creating /admin/restaurants/{restaurantId} resource..."
ADMIN_RESTAURANT_ID_RESOURCE=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ADMIN_RESTAURANTS_ID \
  --path-part '{restaurantId}' \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created /admin/restaurants/{restaurantId} resource: $ADMIN_RESTAURANT_ID_RESOURCE"

# Create /admin/restaurants/{restaurantId}/menu resource
echo "Creating /admin/restaurants/{restaurantId}/menu resource..."
ADMIN_MENU_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ADMIN_RESTAURANT_ID_RESOURCE \
  --path-part menu \
  --region $REGION \
  --query 'id' \
  --output text)

echo "Created /admin/restaurants/{restaurantId}/menu resource: $ADMIN_MENU_ID"

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
    --statement-id "apigateway-${LAMBDA_FUNCTION}-${HTTP_METHOD}-$(date +%s)" \
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
create_method $ADMIN_RESTAURANTS_ID "GET" "ListAllRestaurants"
create_method $ADMIN_MENU_ID "GET" "GetRestaurantMenu"

echo "Creating deployment..."
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod \
  --region $REGION

echo ""
echo "Admin endpoints added successfully!"
echo "Base URL: https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod"
echo ""
echo "New Admin Endpoints:"
echo "  GET    /admin/restaurants"
echo "  GET    /admin/restaurants/{restaurantId}/menu"
echo ""
