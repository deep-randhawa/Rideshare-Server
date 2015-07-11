#!/bin/bash

# call curl with the post request

curl -X POST \
 -H "Content-Type: application/json" \
 -b cookiejar \
 -d '{"name": "Harjit Randhawa", "user_id": 12345678910, "home_location": "1234:5678", "provider": "google"}' \
 http://localhost:5000/user

echo
