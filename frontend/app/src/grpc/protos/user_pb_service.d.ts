// package: pb
// file: protos/user.proto

import * as protos_user_pb from "../protos/user_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UsersGetUser = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protos_user_pb.UserRequest;
  readonly responseType: typeof protos_user_pb.User;
};

type UsersCreateUser = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof protos_user_pb.User;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type UsersGetUsers = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof protos_user_pb.User;
};

export class Users {
  static readonly serviceName: string;
  static readonly GetUser: UsersGetUser;
  static readonly CreateUser: UsersCreateUser;
  static readonly GetUsers: UsersGetUsers;
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

export class UsersClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getUser(
    requestMessage: protos_user_pb.UserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.User|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: protos_user_pb.UserRequest,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.User|null) => void
  ): UnaryResponse;
  createUser(metadata?: grpc.Metadata): RequestStream<protos_user_pb.User>;
  getUsers(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<protos_user_pb.User>;
}

