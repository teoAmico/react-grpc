import { useEffect, useState } from "react";
import { HelloRequest, HelloReply } from "./grpc/protos/helloworld_pb";
import {
  GreeterClient,
  ServiceError,
} from "./grpc/protos/helloworld_pb_service";

function App() {
  const [greeting, setGreeting] = useState("Not Connected");

  useEffect(() => {
    (async () => {
      const greeterClient = new GreeterClient(
        "http://localhost:8080",
        undefined
      );
      const sayHello = (name: string): Promise<HelloReply> => {
        return new Promise((resolve, reject) => {
          const request = new HelloRequest();
          request.setName(name);
          greeterClient.sayHello(
            request,
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
