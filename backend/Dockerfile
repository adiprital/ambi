# Use an official Node.js runtime as the base image
FROM node:lts-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

# Install the dependencies
RUN npm i mongoose
RUN npm i dotenv
RUN npm install 

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]

# Expose the port that the Express server will listen on
EXPOSE 8000