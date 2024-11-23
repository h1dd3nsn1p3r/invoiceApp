FROM oven/bun:alpine

# Create app directory
WORKDIR /app

# Copy everything from the current directory to the /app
COPY . .

# Install app dependencies
RUN bun install

# Expose the port the app runs on
# The app will be running on port 2600
# Example: http://localhost:2600
EXPOSE 2600

# Serve the app
CMD ["bun", "run", "start"]
