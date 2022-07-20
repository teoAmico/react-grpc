package service

import (
	"demo/internal/util"

	"github.com/hashicorp/go-hclog"
)

type Server struct {
	Config util.Config
	Log    hclog.Logger
}

func NewServer(config util.Config, log hclog.Logger) (*Server, error) {
	return &Server{
		Config: config,
		Log:    log,
	}, nil
}
