import * as jspb from "google-protobuf"

export class ChatRes extends jspb.Message {
  getStatus(): EStatus;
  setStatus(value: EStatus): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatRes.AsObject;
  static toObject(includeInstance: boolean, msg: ChatRes): ChatRes.AsObject;
  static serializeBinaryToWriter(message: ChatRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatRes;
  static deserializeBinaryFromReader(message: ChatRes, reader: jspb.BinaryReader): ChatRes;
}

export namespace ChatRes {
  export type AsObject = {
    status: EStatus,
    message: string,
  }
}

export class Stub extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Stub.AsObject;
  static toObject(includeInstance: boolean, msg: Stub): Stub.AsObject;
  static serializeBinaryToWriter(message: Stub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Stub;
  static deserializeBinaryFromReader(message: Stub, reader: jspb.BinaryReader): Stub;
}

export namespace Stub {
  export type AsObject = {
  }
}

export class Autor extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAvatar(): string;
  setAvatar(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Autor.AsObject;
  static toObject(includeInstance: boolean, msg: Autor): Autor.AsObject;
  static serializeBinaryToWriter(message: Autor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Autor;
  static deserializeBinaryFromReader(message: Autor, reader: jspb.BinaryReader): Autor;
}

export namespace Autor {
  export type AsObject = {
    id: string,
    name: string,
    avatar: string,
  }
}

export class Message extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getAuthor(): Autor | undefined;
  setAuthor(value?: Autor): void;
  hasAuthor(): boolean;
  clearAuthor(): void;

  getMessage(): string;
  setMessage(value: string): void;

  getUpdatedat(): string;
  setUpdatedat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: string,
    author?: Autor.AsObject,
    message: string,
    updatedat: string,
  }
}

export enum EStatus { 
  UNKNOWN = 0,
  SUCCESS = 1,
  ERROR = 2,
}
