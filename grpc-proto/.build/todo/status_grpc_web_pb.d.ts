import * as grpcWeb from 'grpc-web';

import * as todo_types_pb from './todo.types_pb';

import {
  AddStatusReq,
  StatusList,
  StatusReq} from './status_pb';

export class StatusServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  addStatus(
    request: AddStatusReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  updateStatus(
    request: StatusList,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  deleteStatus(
    request: StatusReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatusRes) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatusRes>;

  getStatus(
    request: StatusReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: todo_types_pb.TaskStatus) => void
  ): grpcWeb.ClientReadableStream<todo_types_pb.TaskStatus>;

  getStatuses(
    request: todo_types_pb.TodoStub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: StatusList) => void
  ): grpcWeb.ClientReadableStream<StatusList>;

  getStatusesWithTasks(
    request: todo_types_pb.TodoStub,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: StatusList) => void
  ): grpcWeb.ClientReadableStream<StatusList>;

}

export class StatusServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  addStatus(
    request: AddStatusReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  updateStatus(
    request: StatusList,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  deleteStatus(
    request: StatusReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatusRes>;

  getStatus(
    request: StatusReq,
    metadata?: grpcWeb.Metadata
  ): Promise<todo_types_pb.TaskStatus>;

  getStatuses(
    request: todo_types_pb.TodoStub,
    metadata?: grpcWeb.Metadata
  ): Promise<StatusList>;

  getStatusesWithTasks(
    request: todo_types_pb.TodoStub,
    metadata?: grpcWeb.Metadata
  ): Promise<StatusList>;

}

