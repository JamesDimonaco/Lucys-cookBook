# Use a Rust base image from Docker Hub
FROM rust:1.53-buster as builder

# Set the working directory inside the container
WORKDIR /usr/src/app



# Copy the entire current directory into the container
COPY . .

# Build the Rust application with optimizations
RUN rustup default stable
RUN cargo build --release

# Create a new minimal image to reduce the final image size
FROM debian:buster-slim

# Install the libssl-dev package
# Install necessary packages
RUN apt-get update \
    && apt-get install -y libssl-dev openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*



# Copy the built binary from the builder stage to the new image
COPY --from=builder /usr/src/app/target/release/backend .

RUN chmod +x ./backend


# Expose the port your application listens on
EXPOSE 3232

# Command to run your application
CMD ["./backend"]
