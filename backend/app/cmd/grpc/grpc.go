package grpc

import (
	"demo/internal/service"
	"demo/internal/util"
	pb "demo/pkg/protos"
	"github.com/hashicorp/go-hclog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/reflection"
	"net"
	"os"
)

func RunGrpcServer(config util.Config, log hclog.Logger) {
	log.Info("grpc server address", config.GrpcServerAddress)

	l, err := net.Listen("tcp", config.GrpcServerAddress)
	if err != nil {
		log.Error("Unable to listen", "error", err)
		os.Exit(1)
	}

	gs := grpc.NewServer()

	hs := health.NewServer()

	//health check grpc server
	hs.SetServingStatus("", healthpb.HealthCheckResponse_SERVING)
	healthpb.RegisterHealthServer(gs, hs)

	srv, err := service.NewServer(config, log)
	if err != nil {
		log.Error("Unable to create a server", "error", err)
		os.Exit(1)
	}

	pb.RegisterGreeterServer(gs, srv)

	if config.AppEnv == "dev" {
		reflection.Register(gs)
	}

	gs.Serve(l)
}
