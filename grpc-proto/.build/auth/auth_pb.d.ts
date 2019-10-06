import * as jspb from "google-protobuf"

import * as auth_types_pb from './auth.types_pb';

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
  }
}

export class VerifyAuthTokenReq extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAuthTokenReq.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAuthTokenReq): VerifyAuthTokenReq.AsObject;
  static serializeBinaryToWriter(message: VerifyAuthTokenReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAuthTokenReq;
  static deserializeBinaryFromReader(message: VerifyAuthTokenReq, reader: jspb.BinaryReader): VerifyAuthTokenReq;
}

export namespace VerifyAuthTokenReq {
  export type AsObject = {
    token: string,
  }
}

export class VerifyAuthTokenRes extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAuthTokenRes.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAuthTokenRes): VerifyAuthTokenRes.AsObject;
  static serializeBinaryToWriter(message: VerifyAuthTokenRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAuthTokenRes;
  static deserializeBinaryFromReader(message: VerifyAuthTokenRes, reader: jspb.BinaryReader): VerifyAuthTokenRes;
}

export namespace VerifyAuthTokenRes {
  export type AsObject = {
    id: string,
    email: string,
  }
}

