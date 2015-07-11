#!/bin/bash

curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"source": "west lafayette", "destination": "chicago", "rideDate": "2008-11-11 13:23:44", "maxUsers": 5}' \
 -b cookiejar \
 http://localhost:5000/ride

echo
