// package: pb
// file: protos/auth.proto

var protos_auth_pb = require("../protos/auth_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Auth = (function () {
  function Auth() {}
  Auth.serviceName = "pb.Auth";
  return Auth;
}());

Auth.Login = {
  methodName: "Login",
  service: Auth,
  requestStream: false,
  responseStream: false,
  requestType: protos_auth_pb.LoginRequest,
  responseType: protos_auth_pb.LoginResponse
};

exports.Auth = Auth;

function AuthClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AuthClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Auth.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.AuthClient = AuthClient;

