#!/bin/bash
docker-compose -f docker-compose.yml -f docker-compose.ec2.yml up --build -d
