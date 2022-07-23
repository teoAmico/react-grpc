# Demo Project in react + gRPC with Go + mongodb


### library frontend

```yarn add grpc```

```yarn add ts-protoc-gen```

https://github.com/stephenh/ts-proto


### Make gRPC calls

grpcurl -plaintext 127.0.0.1:9000 list

grpcurl -plaintext 127.0.0.1:9000 grpc.health.v1.Health/Check

grpcurl -plaintext -d '{"name": "Matteo"}' 127.0.0.1:9000 pb.Greeter.SayHello



