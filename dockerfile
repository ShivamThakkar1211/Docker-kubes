FROM node:16-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password


# Create app directory
WORKDIR /home/app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Copy the rest of the application files from the backend
COPY backend/ ./

# Copy the frontend files
COPY frontend/ ./frontend/

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD [ "node", "server.js" ]
