import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

import { Message } from '@grpc-proto/chat/chat.types_pb';

@Injectable()
export class ChatEventService {
    private readonly updates$ = new Subject<Message.AsObject[]>();

    public emit(message: Message.AsObject): void {
        this.updates$.next([message]);
    }

    public broadcast(): Observable<Message.AsObject[]> {
        return this.updates$.asObservable();
    }
}
