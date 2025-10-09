#!/bin/bash

ROLE_ARN="arn:aws:iam::495599767527:role/ResPortalLambdaExecutionRole"
REGION="us-west-2"
LAMBDA_DIR="/Users/fizz/work/res-portal/infrastructure/lambda"

cd $LAMBDA_DIR

# Wait for role to propagate
echo "Waiting for IAM role to propagate..."
sleep 10

# Function to create/update Lambda function
deploy_lambda() {
  FUNCTION_NAME=$1
  HANDLER=$2

  echo "Deploying $FUNCTION_NAME..."

  # Create deployment package
  zip -q -r ${FUNCTION_NAME}.zip ${HANDLER} node_modules/

  # Check if function exists
  if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION 2>/dev/null; then
    echo "Updating existing function $FUNCTION_NAME..."
    aws lambda update-function-code \
      --function-name $FUNCTION_NAME \
      --zip-file fileb://${FUNCTION_NAME}.zip \
      --region $REGION
  else
    echo "Creating new function $FUNCTION_NAME..."
    aws lambda create-function \
      --function-name $FUNCTION_NAME \
      --runtime nodejs20.x \
      --role $ROLE_ARN \
      --handler $HANDLER \
      --zip-file fileb://${FUNCTION_NAME}.zip \
      --timeout 30 \
      --memory-size 512 \
      --region $REGION
  fi

  rm ${FUNCTION_NAME}.zip
  echo "$FUNCTION_NAME deployed successfully!"
}

# Deploy all Lambda functions
deploy_lambda "RegisterRestaurant" "registerRestaurant.handler"
deploy_lambda "AuthenticateRestaurant" "authenticateRestaurant.handler"
deploy_lambda "GetRestaurant" "getRestaurant.handler"
deploy_lambda "UpdateRestaurant" "updateRestaurant.handler"
deploy_lambda "ListOrders" "listOrders.handler"
deploy_lambda "ListAllRestaurants" "listAllRestaurants.handler"
deploy_lambda "GetRestaurantMenu" "getRestaurantMenu.handler"

echo "All Lambda functions deployed successfully!"
