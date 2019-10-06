import * as jspb from "google-protobuf"

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

export enum EStatus { 
  AUTH_ACTION_UNKNOWN = 0,
  AUTH_ACTION_SUCCESS = 1,
  AUTH_ACTION_ERROR = 2,
}
