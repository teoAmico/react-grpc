package service

import (
	"context"
	pb "demo/pkg/protos"
)

func (s *Server) SayHello(cxt context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {

	response := &pb.HelloReply{
		Message: "Hello, " + req.Name,
	}
	return response, nil
}
