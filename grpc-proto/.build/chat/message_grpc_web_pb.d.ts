import * as grpcWeb from 'grpc-web';

import * as chat_types_pb from './chat.types_pb';

import {
  DeleteMessageReq,
  EditMessageReq,
  SendMessageReq} from './message_pb';

export class MessageServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  sendMessage(
    request: SendMessageReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: chat_types_pb.ChatRes) => void
  ): grpcWeb.ClientReadableStream<chat_types_pb.ChatRes>;

  editMessage(
    request: EditMessageReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: chat_types_pb.ChatRes) => void
  ): grpcWeb.ClientReadableStream<chat_types_pb.ChatRes>;

  deleteMessage(
    request: DeleteMessageReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: chat_types_pb.ChatRes) => void
  ): grpcWeb.ClientReadableStream<chat_types_pb.ChatRes>;

}

export class MessageServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  sendMessage(
    request: SendMessageReq,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_types_pb.ChatRes>;

  editMessage(
    request: EditMessageReq,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_types_pb.ChatRes>;

  deleteMessage(
    request: DeleteMessageReq,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_types_pb.ChatRes>;

}

