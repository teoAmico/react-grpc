jump-in:
	docker exec -it backend sh

up:
	docker compose up

down:
	docker compose down

app-test:
	go test backend/app/tests

app-build:
	go build -o backend/app/build/api/main backend/app/cmd/api

app-run:
	go run backend/app/cmd/api/main.go

gen-protos:
	rm -f backend/app/pkg/api/protos/*.go
	protoc --go_out=pkg --go_opt=paths=source_relative \
    --go-grpc_out=pkg --go-grpc_opt=paths=source_relative \
    backend/app/api/protos/*.proto
