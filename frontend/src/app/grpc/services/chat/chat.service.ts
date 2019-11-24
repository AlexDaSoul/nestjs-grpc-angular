import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcStream } from '@grpc/helpers/grpc-stream';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';

import { ChatServicePromiseClient } from '@grpc/proto/chat/chat_grpc_web_pb';
import { ChatList } from '@grpc/proto/chat/chat_pb';
import { Stub } from '@grpc/proto/chat/chat.types_pb';


@Injectable({
    providedIn: 'root',
})
export class ChatGrpcService {

    constructor(private client: ChatServicePromiseClient) {
    }

    public getChat(): Observable<ChatList.AsObject> {
        const req = new Stub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcStream<ChatList.AsObject>(this.client.getChat(req, meta));
    }
}
