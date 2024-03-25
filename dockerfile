# Sets Node.js version
FROM node:latest

# Sets the container path
WORKDIR /usr/src/app

# Copies the package.json
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copies the other files on the container
COPY . .

# Exposes the port 
EXPOSE 5555

# Command to run the app
CMD ["node", "index.js"]