import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';

import { MessageServicePromiseClient } from '@grpc/proto/chat/message_grpc_web_pb';
import { DeleteMessageReq, EditMessageReq, SendMessageReq } from '@grpc/proto/chat/message_pb';
import { ChatRes } from '@grpc/proto/chat/chat.types_pb';

@Injectable({
    providedIn: 'root',
})
export class StatusGrpcService {

    constructor(private client: MessageServicePromiseClient) {
    }

    public sendMessage(data: SendMessageReq.AsObject): Observable<ChatRes.AsObject> {
        const req = new SendMessageReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setMessage(data.message);

        return grpcUnary<ChatRes.AsObject>(this.client.sendMessage(req, meta));
    }

    public editMessage(data: EditMessageReq.AsObject): Observable<ChatRes.AsObject> {
        const req = new EditMessageReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);
        req.setMessage(data.message);

        return grpcUnary<ChatRes.AsObject>(this.client.editMessage(req, meta));
    }

    public deleteMessage(data: DeleteMessageReq.AsObject): Observable<ChatRes.AsObject> {
        const req = new DeleteMessageReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<ChatRes.AsObject>(this.client.deleteMessage(req, meta));
    }
}
