import * as jspb from "google-protobuf"

import * as chat_types_pb from './chat.types_pb';

export class ChatList extends jspb.Message {
  getMessagesList(): Array<chat_types_pb.Message>;
  setMessagesList(value: Array<chat_types_pb.Message>): void;
  clearMessagesList(): void;
  addMessages(value?: chat_types_pb.Message, index?: number): chat_types_pb.Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatList.AsObject;
  static toObject(includeInstance: boolean, msg: ChatList): ChatList.AsObject;
  static serializeBinaryToWriter(message: ChatList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatList;
  static deserializeBinaryFromReader(message: ChatList, reader: jspb.BinaryReader): ChatList;
}

export namespace ChatList {
  export type AsObject = {
    messagesList: Array<chat_types_pb.Message.AsObject>,
  }
}

