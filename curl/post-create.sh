curl localhost:3000/api/products \
-X POST \
-H "Content-Type: application/json" \
-d '{
    "name": "iPhone 15",
    "description": "iPhone 15",
    "price": 1999.99
}'

curl localhost:3000/api/products
