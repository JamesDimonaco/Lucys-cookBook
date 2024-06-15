# Use a Rust base image from Docker Hub
FROM rust:1.53-buster as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

ARG DATABASE_URL
ARG OPENAI_API_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Copy the entire current directory into the container
COPY . .

# Build the Rust application with optimizations
RUN cargo build --release

# Create a new minimal image to reduce the final image size
FROM debian:buster-slim

# Install the libssl-dev package
# Install necessary packages
RUN apt-get update \
    && apt-get install -y libssl-dev openssl \
    && rm -rf /var/lib/apt/lists/*


# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the built binary from the builder stage to the new image
COPY --from=builder /usr/src/app/target/release/backend .



# Expose the port your application listens on
EXPOSE 4000

# Command to run your application
CMD ["./backend"]
