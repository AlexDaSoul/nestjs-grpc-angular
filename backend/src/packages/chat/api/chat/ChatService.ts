import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatList } from '../../grpc-proto/chat/chat_pb';

import { MessageDataFinder } from '../../services/dal/data-finders/MessageDataFinder';

@Injectable()
export class ChatService {

    constructor(
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public getChatStream(): Observable<ChatList.AsObject> {
        return this.messageDataFinder.getChatStream()
            .pipe(map(messagesList => ({ messagesList })));
    }
}
