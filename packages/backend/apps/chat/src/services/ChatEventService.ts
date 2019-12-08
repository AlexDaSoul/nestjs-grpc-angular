import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

import { api } from '@grpc-proto/chat/chat.types';

@Injectable()
export class ChatEventService {
    private readonly updates$ = new Subject<api.chat.Message[]>();

    public emit(message: api.chat.Message): void {
        this.updates$.next([message]);
    }

    public broadcast(): Observable<api.chat.Message[]> {
        return this.updates$.asObservable();
    }
}
