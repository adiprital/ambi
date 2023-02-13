# Use an official Node.js runtime as the base image
FROM node:lts-alpine 

# Set the working directory in the container
WORKDIR /app
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install the application dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

ENV NODE_ENV production

# Build the ReactJS application
RUN npm run build

# Use the production web server to serve the built application
FROM node:lts-alpine 
WORKDIR /app
# COPY --from=0 /app/build /app
COPY . .
CMD ["npm", "start"]

# Expose port 3000 for the application to listen on
EXPOSE 3000

