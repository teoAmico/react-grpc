import { grpc } from "@improbable-eng/grpc-web";
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import { HelloRequest, HelloReply } from "./grpc/protos/helloworld_pb";
import {
  GreeterClient,
  ServiceError,
} from "./grpc/protos/helloworld_pb_service";
import { LoginRequest, LoginResponse } from "./grpc/protos/user_pb";
import { UserClient } from "./grpc/protos/user_pb_service";

const greeterClient = new GreeterClient("http://localhost:8080");
const userClient = new UserClient("http://localhost:8080");

const login = (username: string, pwd: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    const request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(pwd);
    userClient.login(
      request,
      (err: ServiceError | null, response: LoginResponse | null) => {
        if (!err && null !== response) {
          resolve(response);
        } else {
          reject(err);
        }
      }
    );
  });
};

const sayHello = (name: string, token: string): Promise<HelloReply> => {
  return new Promise((resolve, reject) => {
    const request = new HelloRequest();
    request.setName(name);
    const metadata = new grpc.Metadata();
    metadata.append("jwt", token);
    greeterClient.sayHello(
      request,
      metadata,
      (err: ServiceError | null, response: HelloReply | null) => {
        if (!err && null !== response) {
          resolve(response);
        } else {
          reject(err);
        }
      }
    );
  });
};

function App() {
  const [greeting, setGreeting] = useState("Not Connected");

  useEffect(() => {
    (async () => {
      await login("Admin", "password").then(
        function (result) {
          sayHello("Admin", result.getJwttoken()).then(
            function (result) {
              setGreeting(result.getMessage());
            },
            function (err) {
              console.log(err);
            }
          );
        },
        function (err) {
          console.log(err);
        }
      );
    })();
  }, []);

  return (
    <div>
      <h1>Test GRPC: {greeting}</h1>
    </div>
  );
}

export default App;
