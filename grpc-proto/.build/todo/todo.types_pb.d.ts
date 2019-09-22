import * as jspb from "google-protobuf"

export class Task extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getIndex(): number;
  setIndex(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    id: string,
    userid: string,
    index: number,
    title: string,
    description: string,
    status: string,
  }
}

export class TaskStatusRes extends jspb.Message {
  getStatus(): ETodoStatus;
  setStatus(value: ETodoStatus): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskStatusRes.AsObject;
  static toObject(includeInstance: boolean, msg: TaskStatusRes): TaskStatusRes.AsObject;
  static serializeBinaryToWriter(message: TaskStatusRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskStatusRes;
  static deserializeBinaryFromReader(message: TaskStatusRes, reader: jspb.BinaryReader): TaskStatusRes;
}

export namespace TaskStatusRes {
  export type AsObject = {
    status: ETodoStatus,
  }
}

export class TodoStub extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TodoStub.AsObject;
  static toObject(includeInstance: boolean, msg: TodoStub): TodoStub.AsObject;
  static serializeBinaryToWriter(message: TodoStub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TodoStub;
  static deserializeBinaryFromReader(message: TodoStub, reader: jspb.BinaryReader): TodoStub;
}

export namespace TodoStub {
  export type AsObject = {
  }
}

export class TaskStatus extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getIndex(): number;
  setIndex(value: number): void;

  getName(): string;
  setName(value: string): void;

  getTasksList(): Array<Task>;
  setTasksList(value: Array<Task>): void;
  clearTasksList(): void;
  addTasks(value?: Task, index?: number): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskStatus.AsObject;
  static toObject(includeInstance: boolean, msg: TaskStatus): TaskStatus.AsObject;
  static serializeBinaryToWriter(message: TaskStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskStatus;
  static deserializeBinaryFromReader(message: TaskStatus, reader: jspb.BinaryReader): TaskStatus;
}

export namespace TaskStatus {
  export type AsObject = {
    id: string,
    userid: string,
    index: number,
    name: string,
    tasksList: Array<Task.AsObject>,
  }
}

export enum ETodoStatus { 
  TODO_ACTION_UNKNOWN = 0,
  TODO_ACTION_SUCCESS = 1,
  TODO_ACTION_ERROR = 2,
}
