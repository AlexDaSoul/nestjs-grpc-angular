import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '@grpc-proto/chat/chat.types_pb';

import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';

@Injectable()
export class ChatService {

    constructor(
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public getChatStream(): Observable<{ messages: Message.AsObject[] }> {
        return this.messageDataFinder.getChatStream()
            .pipe(map(messages => ({messages})));
    }
}
