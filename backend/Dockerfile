FROM golang:1.18.4-alpine3.16

# Install Reflex for development
RUN go install github.com/cespare/reflex@latest

# Add a work directory
WORKDIR /app

# Cache and install dependencies
COPY ./app/go.mod .
COPY ./app/go.sum .

RUN go mod download

# Copy app files
COPY ./app .

# Expose port
EXPOSE 9000

CMD reflex -r '\.go$' go run cmd/api/main.go --start-service
