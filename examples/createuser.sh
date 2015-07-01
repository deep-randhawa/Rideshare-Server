#!/bin/bash

# call curl with the post request

curl -X POST \
 -H "Content-Type: application/json" \
 -H "access_token: CAACEdEose0cBABLTZAAnlsNcZBbfviGkKCMx7xF8nBr5WakP5OIvxNQYVUyUDxeFaR6M50RKNp61lvDaZBZBeDIyndjopFpjMgAI5aGqH4TRNzk0zAF4zICZCBwRUcavztA4GBZBl3ZBMJp4IZBPXCIptZAzSa4XryCXgCv2p7Xb08i5MgzezgS7Mpij4WaWEndSfF8catLClLYR5CCFdNZCvPSuUNSzXSz0kZD" \
 -d '{"name":"Deep Randhawa", "homeLat":"31", "homeLong":"32", "provider":"google"}' \
 -b cookiejar \
 -c cookiejar \
 http://localhost:5000/get_all_users

echo
