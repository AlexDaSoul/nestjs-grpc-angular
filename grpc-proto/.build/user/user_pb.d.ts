import * as jspb from "google-protobuf"

import * as user_types_pb from './user.types_pb';

export class CreateUserReq extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserReq.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserReq): CreateUserReq.AsObject;
  static serializeBinaryToWriter(message: CreateUserReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserReq;
  static deserializeBinaryFromReader(message: CreateUserReq, reader: jspb.BinaryReader): CreateUserReq;
}

export namespace CreateUserReq {
  export type AsObject = {
    name: string,
    email: string,
    password: string,
  }
}

export class UpdateUserReq extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserReq): UpdateUserReq.AsObject;
  static serializeBinaryToWriter(message: UpdateUserReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserReq;
  static deserializeBinaryFromReader(message: UpdateUserReq, reader: jspb.BinaryReader): UpdateUserReq;
}

export namespace UpdateUserReq {
  export type AsObject = {
    name: string,
    email: string,
  }
}

export class VerifyUserReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyUserReq.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyUserReq): VerifyUserReq.AsObject;
  static serializeBinaryToWriter(message: VerifyUserReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyUserReq;
  static deserializeBinaryFromReader(message: VerifyUserReq, reader: jspb.BinaryReader): VerifyUserReq;
}

export namespace VerifyUserReq {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class UserReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserReq.AsObject;
  static toObject(includeInstance: boolean, msg: UserReq): UserReq.AsObject;
  static serializeBinaryToWriter(message: UserReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserReq;
  static deserializeBinaryFromReader(message: UserReq, reader: jspb.BinaryReader): UserReq;
}

export namespace UserReq {
  export type AsObject = {
    id: string,
  }
}

export class UserRes extends jspb.Message {
  getStatus(): user_types_pb.EUserStatus;
  setStatus(value: user_types_pb.EUserStatus): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRes.AsObject;
  static toObject(includeInstance: boolean, msg: UserRes): UserRes.AsObject;
  static serializeBinaryToWriter(message: UserRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRes;
  static deserializeBinaryFromReader(message: UserRes, reader: jspb.BinaryReader): UserRes;
}

export namespace UserRes {
  export type AsObject = {
    status: user_types_pb.EUserStatus,
    message: string,
  }
}

export class UsersRes extends jspb.Message {
  getUsersList(): Array<user_types_pb.User>;
  setUsersList(value: Array<user_types_pb.User>): void;
  clearUsersList(): void;
  addUsers(value?: user_types_pb.User, index?: number): user_types_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersRes.AsObject;
  static toObject(includeInstance: boolean, msg: UsersRes): UsersRes.AsObject;
  static serializeBinaryToWriter(message: UsersRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersRes;
  static deserializeBinaryFromReader(message: UsersRes, reader: jspb.BinaryReader): UsersRes;
}

export namespace UsersRes {
  export type AsObject = {
    usersList: Array<user_types_pb.User.AsObject>,
  }
}

