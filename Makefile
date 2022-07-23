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

gen-go-protos:
	rm -f backend/app/pkg/protos/*.go
	protoc --go_out=backend/app/pkg --go_opt=paths=source_relative \
    --go-grpc_out=backend/app/pkg --go-grpc_opt=paths=source_relative \
    protos/*.proto

gen-ts-protos:
	rm -f frontend/app/src/grpc/protos/*.ts
	rm -f frontend/app/src/grpc/protos/*.js
	protoc --plugin="protoc-gen-ts=frontend/app/node_modules/.bin/protoc-gen-ts" \
		--js_out="import_style=commonjs,binary:frontend/app/src/grpc" \
		--ts_out="service=grpc-web:frontend/app/src/grpc" \
        protos/*.proto

