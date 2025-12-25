FROM nginx:alpine

# Copy static files to nginx html directory
COPY . /usr/share/nginx/html

# Remove unnecessary files
RUN rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/.dockerignore

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
