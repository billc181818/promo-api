# Use a Node.js runtime as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the source code to the container
COPY ./src .

# Run tests
RUN npm run test

# Expose port 80 for HTTP traffic
EXPOSE 3000

#ENTRYPOINT ["/environment/entrypoint.sh"]
CMD [ "node", "app.js" ]