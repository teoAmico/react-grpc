package grpc

import (
	"context"
	"demo/internal/util"
	"errors"
	"fmt"
	"github.com/hashicorp/go-hclog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"os"
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

	jwt := meta.Get("jwt")

	if len(jwt) > 0 {
		config := util.LoadConfig(log, ".")
		v, err := util.NewValidator(config)
		if err != nil {
			fmt.Printf("unable to create validator: %v\n", err)
			os.Exit(1)
		}

		token, err := v.GetToken(jwt[0])
		if err != nil {
			fmt.Printf("unable to get validated token: %v\n", err)
			os.Exit(1)
		}
		log.Info("jwt-token: ", token.Claims)
	}

	log.Info("request - Method:" + info.FullMethod + "\tDuration:" + time.Since(start).String())

	h, err := handler(ctx, req)
	log.Error("Error:", err)

	return h, err
}
