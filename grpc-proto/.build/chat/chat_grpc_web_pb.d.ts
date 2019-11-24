import * as grpcWeb from 'grpc-web';

import * as chat_types_pb from './chat.types_pb';

import {ChatList} from './chat_pb';

export class ChatServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getChat(
    request: chat_types_pb.Stub,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ChatList>;

}

export class ChatServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getChat(
    request: chat_types_pb.Stub,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ChatList>;

}

