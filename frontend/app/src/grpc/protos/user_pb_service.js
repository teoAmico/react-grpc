// package: pb
// file: protos/user.proto

var protos_user_pb = require("../protos/user_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var User = (function () {
  function User() {}
  User.serviceName = "pb.User";
  return User;
}());

User.Login = {
  methodName: "Login",
  service: User,
  requestStream: false,
  responseStream: false,
  requestType: protos_user_pb.LoginRequest,
  responseType: protos_user_pb.LoginResponse
};

exports.User = User;

function UserClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

UserClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(User.Login, {
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

exports.UserClient = UserClient;

