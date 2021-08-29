#!/usr/bin/env bash
# This file tags and uploads an image to Docker Hub

# Assumes that an image is built via `run_docker.sh`

# Step 1:
# Create dockerpath
dockerpath=sakshikst/udacityproject

# Step 2:  
# Authenticate & tag
docker login -u sakshikst -p $password
# Gap@1998@
echo "Docker ID and Image: $dockerpath"
docker tag udacityproject $dockerpath

# Step 3:
# Push image to a docker repository
docker push $dockerpath