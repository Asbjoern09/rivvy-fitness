#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/api"

echo "Testing Authentication Flow..."
echo "--------------------------"

# Register user
echo "1. Registering new user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User2",
    "email": "test@exampl2e.com",
    "password": "password123"
  }')

echo "Register Response: $REGISTER_RESPONSE"
echo "--------------------------"

# Login
echo "2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

# Extract token from login response (assumes jq is installed)
# TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
# If you don't have jq, you'll need to extract the token manually from the LOGIN_RESPONSE

echo "Login Response: $LOGIN_RESPONSE"
echo "--------------------------"

echo "Copy the token from the response above and use it in the following commands:"
echo "To get all users:"
echo "curl -X GET $BASE_URL/users -H \"Authorization: Bearer YOUR_TOKEN\""
echo "--------------------------"