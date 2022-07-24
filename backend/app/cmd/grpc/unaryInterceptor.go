package grpc

import (
	"context"
	"errors"
	"github.com/hashicorp/go-hclog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"time"
)

func unaryInterceptor(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler) (interface{}, error) {

	log := hclog.Default()
	start := time.Now()

	meta, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		log.Error("could not grab metadata from context")
		return nil, errors.New("Could not grab metadata from context")
	}

	h, err := handler(ctx, req)
	log.Info("request - Method:"+info.FullMethod+"\tDuration:"+time.Since(start).String()+"\tmeta: ", meta.Get("jwt"))
	log.Error("Error:", err)

	return h, err
}
