#!/bin/bash

curl -X POST \
 -H "Content-Type: application/json" \
 -H "access_token: CAACEdEose0cBAP0A9G0ICUmglN4kHZCvwsaQcL0BkaYDbEAgpYyLEwi9oGN3YAXOeWzPZAUasOZCH6BqwwU6wmfd4PeZC4ygDKFSebRKMEnkp0UZAqZBGNDcDUBKORkUJyVcUMzdREXGhUlRFdTYO889Tw27ZBxfmvZCLstY350rIFN3a6yZAofL9RGIPJ3AKbTYAkskMWJcfYbN1EZCZBG3la1GoYk9ILDgOlaCq09B0ScgQZDZD" \
 -c cookiejar \
 http://localhost:5000/login/facebook

echo
