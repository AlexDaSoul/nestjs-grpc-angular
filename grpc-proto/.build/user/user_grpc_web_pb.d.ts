import * as grpcWeb from 'grpc-web';

import * as user_types_pb from './user.types_pb';

import {
  CreateUserReq,
  UpdateUserReq,
  UserReq,
  UserRes,
  UsersRes} from './user_pb';

export class UserServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createUser(
    request: CreateUserReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UserRes) => void
  ): grpcWeb.ClientReadableStream<UserRes>;

  updateUser(
    request: UpdateUserReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UserRes) => void
  ): grpcWeb.ClientReadableStream<UserRes>;

  deleteUser(
    request: UserReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UserRes) => void
  ): grpcWeb.ClientReadableStream<UserRes>;

  getUser(
    request: UserReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: user_types_pb.User) => void
  ): grpcWeb.ClientReadableStream<user_types_pb.User>;

  getUsersAll(
    request: user_types_pb.UserStub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UsersRes) => void
  ): grpcWeb.ClientReadableStream<UsersRes>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createUser(
    request: CreateUserReq,
    metadata?: grpcWeb.Metadata
  ): Promise<UserRes>;

  updateUser(
    request: UpdateUserReq,
    metadata?: grpcWeb.Metadata
  ): Promise<UserRes>;

  deleteUser(
    request: UserReq,
    metadata?: grpcWeb.Metadata
  ): Promise<UserRes>;

  getUser(
    request: UserReq,
    metadata?: grpcWeb.Metadata
  ): Promise<user_types_pb.User>;

  getUsersAll(
    request: user_types_pb.UserStub,
    metadata?: grpcWeb.Metadata
  ): Promise<UsersRes>;

}

