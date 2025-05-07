# Stage 1: Install dependencies and run tests
FROM node:20 AS test-stage

WORKDIR /usr/src/app

# Copy the application files
COPY . .

# Install dependencies
RUN npm ci

# Run tests 
RUN npm test

# Stage 2: Build the frontend
FROM node:20 AS build-stage

WORKDIR /usr/src/app

# Copy the application files
COPY . .

# Install dependencies
RUN npm ci

# Build the frontend
RUN npm run build

# Stage 3: Serve with Nginx
FROM nginx:alpine

# Copy the build files from the build-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
