# Use the official Nginx base image
FROM nginx

# Remove the default index.html
RUN rm /usr/share/nginx/html/index.html

# Copy your resume.html file to the default Nginx HTML directory
COPY ./frontend/resume.html /usr/share/nginx/html/index.html

# Copy the images directory
COPY ./frontend/images /usr/share/nginx/html/images

# Set ownership and permissions
RUN chown -R www-data:www-data /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
