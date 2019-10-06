import * as grpcWeb from 'grpc-web';

import * as auth_types_pb from './auth.types_pb';

import {
  AuthReq,
  AuthRes,
  VerifyAuthTokenReq,
  VerifyAuthTokenRes} from './auth_pb';

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
    request: auth_types_pb.Stub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthRes) => void
  ): grpcWeb.ClientReadableStream<AuthRes>;

  verifyAuthToken(
    request: VerifyAuthTokenReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: VerifyAuthTokenRes) => void
  ): grpcWeb.ClientReadableStream<VerifyAuthTokenRes>;

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
    request: auth_types_pb.Stub,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthRes>;

  verifyAuthToken(
    request: VerifyAuthTokenReq,
    metadata?: grpcWeb.Metadata
  ): Promise<VerifyAuthTokenRes>;

}

