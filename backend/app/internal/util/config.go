package util

import (
	"github.com/hashicorp/go-hclog"
	"os"

	"github.com/spf13/viper"
)

type Config struct {
	GrpcServerAddress string `mapstructure:"GRPC_SERVER_ADDRESS"`
	AppEnv            string `mapstructure:"APP_ENV"`
}

func LoadConfig(log hclog.Logger, path string) (config Config) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		log.Error("Unable to read config", "error", err)
		os.Exit(1)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Error("Unable to unmarshal config", "error", err)
		os.Exit(1)
	}

	return
}
