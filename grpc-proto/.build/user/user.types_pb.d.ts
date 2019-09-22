import * as jspb from "google-protobuf"

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
  }
}

export class UserStub extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStub.AsObject;
  static toObject(includeInstance: boolean, msg: UserStub): UserStub.AsObject;
  static serializeBinaryToWriter(message: UserStub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStub;
  static deserializeBinaryFromReader(message: UserStub, reader: jspb.BinaryReader): UserStub;
}

export namespace UserStub {
  export type AsObject = {
  }
}

export enum EUserStatus { 
  USER_ACTION_UNKNOWN = 0,
  USER_ACTION_SUCCESS = 1,
  USER_ACTION_ERROR = 2,
}
