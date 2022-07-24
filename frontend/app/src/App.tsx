import { grpc } from "@improbable-eng/grpc-web";
import { useEffect, useState } from "react";
import { HelloRequest, HelloReply } from "./grpc/protos/helloworld_pb";
import {
  GreeterClient,
  ServiceError,
} from "./grpc/protos/helloworld_pb_service";

const greeterClient = new GreeterClient("http://localhost:8080");

const sayHello = (name: string): Promise<HelloReply> => {
  return new Promise((resolve, reject) => {
    const request = new HelloRequest();
    request.setName(name);
    const metadata = new grpc.Metadata();
    metadata.append("jwt", "token");
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
      await sayHello("Matteo").then(
        function (result) {
          setGreeting(result.getMessage());
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
