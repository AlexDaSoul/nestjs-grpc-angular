import * as jspb from "google-protobuf"

import * as todo_types_pb from './todo.types_pb';

export class AddTaskReq extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTaskReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddTaskReq): AddTaskReq.AsObject;
  static serializeBinaryToWriter(message: AddTaskReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTaskReq;
  static deserializeBinaryFromReader(message: AddTaskReq, reader: jspb.BinaryReader): AddTaskReq;
}

export namespace AddTaskReq {
  export type AsObject = {
    title: string,
    description: string,
  }
}

export class TaskReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskReq.AsObject;
  static toObject(includeInstance: boolean, msg: TaskReq): TaskReq.AsObject;
  static serializeBinaryToWriter(message: TaskReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskReq;
  static deserializeBinaryFromReader(message: TaskReq, reader: jspb.BinaryReader): TaskReq;
}

export namespace TaskReq {
  export type AsObject = {
    id: string,
  }
}

export class TaskList extends jspb.Message {
  getTasksList(): Array<todo_types_pb.Task>;
  setTasksList(value: Array<todo_types_pb.Task>): void;
  clearTasksList(): void;
  addTasks(value?: todo_types_pb.Task, index?: number): todo_types_pb.Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskList.AsObject;
  static toObject(includeInstance: boolean, msg: TaskList): TaskList.AsObject;
  static serializeBinaryToWriter(message: TaskList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskList;
  static deserializeBinaryFromReader(message: TaskList, reader: jspb.BinaryReader): TaskList;
}

export namespace TaskList {
  export type AsObject = {
    tasksList: Array<todo_types_pb.Task.AsObject>,
  }
}

