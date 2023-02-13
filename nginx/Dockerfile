# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Run the Nginx service when the container starts
CMD ["nginx", "-g", "daemon off;"]