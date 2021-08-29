FROM node:12.18.3-stretch-slim

## Step 1:
# Create a working directory
WORKDIR /stockprice

## Step 2:
# Copy source code to working directory
COPY app/ /stockprice/

## Step 3:
# Install required NPM packages and build application
RUN npm install &&\
    npm run build

## Step 4:
# Run application at container launch
CMD ["/bin/bash", "-c", "npm run start"]