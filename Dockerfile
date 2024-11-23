FROM oven/bun:alpine:latest

# Create app directory
WORKDIR /app

# Copy everything from the current directory to the /app 
COPY . .

# Install app dependencies
RUN bun install

# Expose the port the app runs on
EXPOSE 2600

# Serve the app
CMD ["bun", "serve"]
