import * as jspb from "google-protobuf"

import * as user_types_pb from './user.types_pb';

export class AuthReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthReq.AsObject;
  static toObject(includeInstance: boolean, msg: AuthReq): AuthReq.AsObject;
  static serializeBinaryToWriter(message: AuthReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthReq;
  static deserializeBinaryFromReader(message: AuthReq, reader: jspb.BinaryReader): AuthReq;
}

export namespace AuthReq {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class AuthRes extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  getUser(): user_types_pb.User | undefined;
  setUser(value?: user_types_pb.User): void;
  hasUser(): boolean;
  clearUser(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthRes.AsObject;
  static toObject(includeInstance: boolean, msg: AuthRes): AuthRes.AsObject;
  static serializeBinaryToWriter(message: AuthRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthRes;
  static deserializeBinaryFromReader(message: AuthRes, reader: jspb.BinaryReader): AuthRes;
}

export namespace AuthRes {
  export type AsObject = {
    token: string,
    user?: user_types_pb.User.AsObject,
  }
}

