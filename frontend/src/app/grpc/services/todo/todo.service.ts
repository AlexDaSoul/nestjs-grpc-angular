import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcStream } from '@grpc/helpers/grpc-stream';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { TodoServicePromiseClient } from '@grpc/proto/todo/todo_grpc_web_pb';
import { MessageRes, MessageStatusRes, DeleteMessageReq, TodoStub, MessageList } from '@grpc/proto/todo/todo_pb';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private client: TodoServicePromiseClient) {
    }

    public addMessage(data: MessageRes.AsObject): Observable<MessageStatusRes.AsObject> {
        const req = new MessageRes();
        const meta: Metadata = grpcJwtMetadata();

        req.setMessage(data.message);

        return grpcUnary<MessageStatusRes.AsObject>(this.client.addMessage(req, meta));
    }

    public deleteMessage(data: DeleteMessageReq.AsObject): Observable<MessageStatusRes.AsObject> {
        const req = new DeleteMessageReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<MessageStatusRes.AsObject>(this.client.deleteMessage(req, meta));
    }

    public updateMessage(data: MessageRes.AsObject): Observable<MessageStatusRes.AsObject> {
        const req = new MessageRes();
        const meta: Metadata = grpcJwtMetadata();

        req.setMessage(data.message);

        return grpcUnary<MessageStatusRes.AsObject>(this.client.updateMessage(req, meta));
    }

    public getMessagesStream(): Observable<MessageList.AsObject> {
        const req = new TodoStub();

        return grpcStream<MessageList.AsObject>(this.client.getMessagesStream(req));
    }
}
