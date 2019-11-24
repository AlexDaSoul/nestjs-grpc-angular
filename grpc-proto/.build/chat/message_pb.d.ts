import * as jspb from "google-protobuf"

import * as chat_types_pb from './chat.types_pb';

export class SendMessageReq extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageReq.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageReq): SendMessageReq.AsObject;
  static serializeBinaryToWriter(message: SendMessageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageReq;
  static deserializeBinaryFromReader(message: SendMessageReq, reader: jspb.BinaryReader): SendMessageReq;
}

export namespace SendMessageReq {
  export type AsObject = {
    message: string,
  }
}

export class EditMessageReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditMessageReq.AsObject;
  static toObject(includeInstance: boolean, msg: EditMessageReq): EditMessageReq.AsObject;
  static serializeBinaryToWriter(message: EditMessageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditMessageReq;
  static deserializeBinaryFromReader(message: EditMessageReq, reader: jspb.BinaryReader): EditMessageReq;
}

export namespace EditMessageReq {
  export type AsObject = {
    id: string,
    message: string,
  }
}

export class DeleteMessageReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteMessageReq.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteMessageReq): DeleteMessageReq.AsObject;
  static serializeBinaryToWriter(message: DeleteMessageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteMessageReq;
  static deserializeBinaryFromReader(message: DeleteMessageReq, reader: jspb.BinaryReader): DeleteMessageReq;
}

export namespace DeleteMessageReq {
  export type AsObject = {
    id: string,
  }
}

