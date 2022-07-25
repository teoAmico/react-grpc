package service

import (
	"demo/internal/util"
	pb "demo/pkg/protos"

	"github.com/hashicorp/go-hclog"
)

type Server struct {
	//add unimplemented server here
	pb.UnimplementedGreeterServer
	pb.UnimplementedAuthServer
	Config util.Config
	Log    hclog.Logger
}

func NewServer(config util.Config, log hclog.Logger) (*Server, error) {
	return &Server{
		Config: config,
		Log:    log,
	}, nil
}
