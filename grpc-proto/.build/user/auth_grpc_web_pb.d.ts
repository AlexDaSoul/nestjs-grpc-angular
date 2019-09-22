import * as grpcWeb from 'grpc-web';

import * as user_types_pb from './user.types_pb';

import {
  AuthReq,
  AuthRes} from './auth_pb';

export class AuthServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  auth(
    request: AuthReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthRes) => void
  ): grpcWeb.ClientReadableStream<AuthRes>;

  updateAuth(
    request: user_types_pb.UserStub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthRes) => void
  ): grpcWeb.ClientReadableStream<AuthRes>;

}

export class AuthServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  auth(
    request: AuthReq,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthRes>;

  updateAuth(
    request: user_types_pb.UserStub,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthRes>;

}

