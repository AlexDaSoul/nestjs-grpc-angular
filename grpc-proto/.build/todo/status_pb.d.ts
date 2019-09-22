import * as jspb from "google-protobuf"

import * as todo_types_pb from './todo.types_pb';

export class AddStatusReq extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddStatusReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddStatusReq): AddStatusReq.AsObject;
  static serializeBinaryToWriter(message: AddStatusReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddStatusReq;
  static deserializeBinaryFromReader(message: AddStatusReq, reader: jspb.BinaryReader): AddStatusReq;
}

export namespace AddStatusReq {
  export type AsObject = {
    name: string,
    index: number,
  }
}

export class StatusReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusReq.AsObject;
  static toObject(includeInstance: boolean, msg: StatusReq): StatusReq.AsObject;
  static serializeBinaryToWriter(message: StatusReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusReq;
  static deserializeBinaryFromReader(message: StatusReq, reader: jspb.BinaryReader): StatusReq;
}

export namespace StatusReq {
  export type AsObject = {
    id: string,
  }
}

export class StatusList extends jspb.Message {
  getStatusesList(): Array<todo_types_pb.TaskStatus>;
  setStatusesList(value: Array<todo_types_pb.TaskStatus>): void;
  clearStatusesList(): void;
  addStatuses(value?: todo_types_pb.TaskStatus, index?: number): todo_types_pb.TaskStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusList.AsObject;
  static toObject(includeInstance: boolean, msg: StatusList): StatusList.AsObject;
  static serializeBinaryToWriter(message: StatusList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusList;
  static deserializeBinaryFromReader(message: StatusList, reader: jspb.BinaryReader): StatusList;
}

export namespace StatusList {
  export type AsObject = {
    statusesList: Array<todo_types_pb.TaskStatus.AsObject>,
  }
}

