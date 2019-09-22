import * as grpcWeb from 'grpc-web';

import * as todo_types_pb from './todo.types_pb';

import {
  AddTaskReq,
  TaskList,
  TaskReq} from './task_pb';

export class TaskServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  addTask(
    request: AddTaskReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  deleteTask(
    request: TaskReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  updateTask(
    request: TaskList,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  getTask(
    request: TaskReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.Task) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.Task>;

  getTasksByUserId(
    request: todo_types_pb.TodoStub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TaskList) => void
  ): grpcWeb.ClientReadableStream<TaskList>;

  getTasksStream(
    request: todo_types_pb.TodoStub,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<todo_types_pb.Task>;

}

export class TaskServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  addTask(
    request: AddTaskReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  deleteTask(
    request: TaskReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  updateTask(
    request: TaskList,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  getTask(
    request: TaskReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.Task>;

  getTasksByUserId(
    request: todo_types_pb.TodoStub,
    metadata?: grpcWeb.Metadata
  ): Promise<TaskList>;

  getTasksStream(
    request: todo_types_pb.TodoStub,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<todo_types_pb.Task>;

}

