package main

import (
	"demo/cmd/grpc"
	"demo/internal/util"
	"github.com/hashicorp/go-hclog"
)

func main() {
	log := hclog.Default()

	config := util.LoadConfig(log, ".")

	grpc.RunGrpcServer(config, log)
}
