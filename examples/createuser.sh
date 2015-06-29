#!/bin/bash

# call curl with the post request

curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"name":"Deep Randhawa", "homeLat":"31", "homeLong":"32", "merchant_id":"1", "auth_type":"google"}' \
 http://localhost:5000/create_user

echo
