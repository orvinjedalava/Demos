# Use the official Node.js image from the Docker Hub for the initial build stage
FROM node:22-alpine AS build

# Set the working directory inside the temporary build stage container. 
# /source will be the container's working directory in this case)
WORKDIR /source

# Copy the package.json file ( same directory where this file is located ) to the temporary build stage container's working directory ( /source ). 
# This is done separately from the rest of the application code to take advantage of Docker's caching mechanism. 
# If the package.json file hasn't changed since the last build, Docker will use the cached image instead of rebuilding the image from scratch.
COPY package.json .

# Downloads and install the dependencies specified in package.json to the resulting temporary build stage container ( /source/node_modules )
RUN npm install

# Copy the rest of the application source code to the temporary build stage container's working directory ( /source )
COPY . .
# Build the application inside the temporary build stage container using the npm run build command
RUN npm run build

# Use the official nginx image from the Docker Hub to create the final image.
# Nginx will be used as the web server
FROM nginx:stable-alpine

# Copy the build folder from the temporary build stage container to the final container's /usr/share/nginx/html directory
# Nginx serves files from /usr/share/nginx/html directory by default
COPY --from=build /source/build /usr/share/nginx/html

# Expose port 80 of the container generated from this image to the outside world
EXPOSE 80

# Command that will run once a container has been generated from this image
CMD ["nginx", "-g", "daemon off;"]

# BUILDING THE IMAGE
# ==================
# To build the image, run the following command in the same directory as the Dockerfile
# docker build -t <image_name>:<tag> .
# example: docker build -t myhelloworld:latest . ( don't forget the dot at the end of the command)

# FINDING THE IMAGE
# =================
# To see the image, run the following command
# docker images ls

# RUNNING THE CONTAINER
# =====================
# To run the container, run the following command
# docker run -dp 8080:80 <image_name>:<tag>

# FIND THE CONTAINER
# ==================
# To see the running container, run the following command
# docker ps -a

# STOPPING THE CONTAINER
# ======================
# To stop the running container, run the following command
# docker stop <container_id>

# REMOVING THE CONTAINER
# ======================
# To remove the container, run the following command
# docker rm <container_id>

# REMOVING THE IMAGE
# ==================
# To remove the image, run the following command
# docker rmi <image_id>