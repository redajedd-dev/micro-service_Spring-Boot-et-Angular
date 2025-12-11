#!/bin/bash

echo "Starting Discovery Service..."
cd discovery-service
../mvnw spring-boot:run > ../discovery.log 2>&1 &
cd ..
sleep 20

echo "Starting Config Service..."
cd config-service
../mvnw spring-boot:run > ../config.log 2>&1 &
cd ..
sleep 20



echo "Starting Customer Service..."
cd customer-service
../mvnw spring-boot:run > ../customer.log 2>&1 &
cd ..
sleep 10

echo "Starting Inventory Service..."
cd inventory-service
../mvnw spring-boot:run > ../inventory.log 2>&1 &
cd ..
sleep 10

echo "Starting Billing Service..."
cd billing-service
../mvnw spring-boot:run > ../billing.log 2>&1 &
cd ..
sleep 10

echo "Starting Gateway Service..."
cd gatewey-service
nohup ../mvnw spring-boot:run > ../gateway.log 2>&1 &
cd ..


echo "All services started. Check logs for details."
