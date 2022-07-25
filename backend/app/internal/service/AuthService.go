package service

import (
	"context"
	"demo/internal/util"
	pb "demo/pkg/protos"
	"fmt"
	"os"
)

func (s *Server) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {

	//not implemented username/password validation before issuing a jwt token

	issuer, err := util.NewIssuer(s.Config)
	if err != nil {
		fmt.Printf("unable to create issuer: %v\n", err)
		os.Exit(1)
	}

	token, err := issuer.IssueToken(s.Config, req.Username, []string{req.Username, "basic"})
	if err != nil {
		fmt.Printf("unable to issue token: %v\n", err)
		os.Exit(1)
	}

	response := &pb.LoginResponse{
		AccessToken: token,
	}
	return response, nil
}
