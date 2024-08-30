# creates an initial build process to publish the .net core web api project 
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj to the temporary container's /source folder and restore as distinct layers
COPY netcore_webapi.csproj .
RUN dotnet restore

# copy everything else to temporary container's /source folder and publish the project into the temporary container's /publish folder 
COPY . .
RUN dotnet publish netcore_webapi.csproj -c release -o /publish --no-restore

# final stage/image - 
# create an image using the publish files inside the temporary container's /publish folder into a final container's /app folder 
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "netcore_webapi.dll"]

# BUILDING THE IMAGE
# ==================
# To build the image, run the following command in the same directory as the Dockerfile
# docker build -t <image_name>:<tag> .
# example: docker build -t netcore_webapi:latest . ( don't forget the dot at the end of the command)

# FINDING THE IMAGE
# =================
# To see the image, run the following command
# docker images ls

# RUNNING THE CONTAINER
# =====================
# To run the container, run the following command
# docker run -dp 5000:8080 <image_name>:<tag> ( NOTE: .NET Core runs on port 8080 by default, but we are mapping it to port 5000 on the host machine)
# example: docker run -dp 5000:8080 netcore_webapi:latest

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

