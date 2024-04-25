FROM node

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Set environment variable for production
ENV NODE_ENV production

# Specify command to start the application
CMD ["node", "index.js"]