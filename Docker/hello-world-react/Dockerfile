# Use the official Node.js image from the Docker Hub
FROM node:22-alpine

# Set the working directory inside the container generated from this image. 
# /app will be the container's working directory in this case)
WORKDIR /app

# Copy the package.json file ( same directory where this file is located ) to the container's working directory ( /app ). 
# This is done separately from the rest of the application code to take advantage of Docker's caching mechanism. 
# If the package.json file hasn't changed since the last build, Docker will use the cached image instead of rebuilding the image from scratch.
COPY package.json .

# Downloads and install the dependencies specified in package.json to the resulting image ( /app/node_modules )
RUN npm install

# Copy the rest of the application code to the working directory
# This will copy all the files and directories in the current directory to the /app directory in the container
COPY . .

# Expose port 3000 of the container generated from this image to the outside world
EXPOSE 3000

# Command that will run once a container has been generated from this image
CMD ["npm", "start"]

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
# docker run -dp 3000:3000 <image_name>:<tag>

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