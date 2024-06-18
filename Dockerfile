# Use Node 16 alpine as parent image
FROM node:20.11.1-alpine

# Change the working directory on the Docker image to /app
WORKDIR app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 40005 

# Start the application
CMD ["node", "index.js"]
