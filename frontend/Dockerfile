FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --silent
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# install serve to serve the built application
RUN npm install -g serve
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]