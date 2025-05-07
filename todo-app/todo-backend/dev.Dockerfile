FROM node:20

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Nodemon globally for development
RUN npm install -g nodemon

# Copy the rest of the application files
COPY . .

# Set the default command to run the application with Nodemon
CMD ["nodemon", "./bin/www"]