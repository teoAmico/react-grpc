# Demo Project in react + gRPC with Go + mongodb


### library frontend

```yarn add grpc```

```yarn add ts-protoc-gen```

```yarn add @improbable-eng/grpc-web```

https://github.com/stephenh/ts-proto


### Make gRPC calls

grpcurl -plaintext 127.0.0.1:9000 list

grpcurl -plaintext 127.0.0.1:9000 grpc.health.v1.Health/Check

grpcurl -plaintext -d '{"name": "Matteo"}' 127.0.0.1:9000 pb.Greeter.SayHello

grpcurl -plaintext -d '{"username": "Admin", "password": "password123"}' 127.0.0.1:9000 pb.Auth.Login

### MAC openssl setup for generate keys ED25519

```brew install openssl```

run: 

```cd backend/app/openssl``` 

```/usr/local/opt/openssl@3/bin/openssl genpkey -algorithm ED25519 -outform pem -out auth.ed```

```/usr/local/opt/openssl@3/bin/openssl pkey -in auth.ed -pubout > auth.ed.pub```
