// package: pb
// file: protos/auth.proto

import * as protos_auth_pb from "../protos/auth_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AuthLogin = {
  readonly methodName: string;
  readonly service: typeof Auth;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protos_auth_pb.LoginRequest;
  readonly responseType: typeof protos_auth_pb.LoginResponse;
};

export class Auth {
  static readonly serviceName: string;
  static readonly Login: AuthLogin;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AuthClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: protos_auth_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protos_auth_pb.LoginResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: protos_auth_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: protos_auth_pb.LoginResponse|null) => void
  ): UnaryResponse;
}

