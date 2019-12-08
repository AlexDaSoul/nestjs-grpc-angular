import { Injectable } from '@nestjs/common';
import { Observable, concat } from 'rxjs';
import { map } from 'rxjs/operators';

import { api } from '@grpc-proto/chat/chat';

import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';
import { ChatEventService } from '@chat/services/ChatEventService';

@Injectable()
export class ChatService {

    constructor(
        private readonly messageDataFinder: MessageDataFinder,
        private readonly chatEventService: ChatEventService,
    ) {
    }

    public getChatStream(): Observable<api.chat.ChatList> {
        return concat(this.messageDataFinder.getMessageAll(), this.chatEventService.broadcast())
            .pipe(map(messages => ({messages})));
    }
}
