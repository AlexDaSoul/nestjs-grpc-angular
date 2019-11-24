import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SendMessageReq, EditMessageReq } from '../../grpc-proto/chat/message_pb';

import { MessageDataProducer } from '../../services/dal/data-producers/MessageDataProducer';
import { MessageDataRemover } from '../../services/dal/data-removers/MessageDataRemover';
import { MessageDataUpdater } from '../../services/dal/data-updaters/MessageDataUpdater';

@Injectable()
export class MessageService {

    constructor(
        private readonly messageDataProducer: MessageDataProducer,
        private readonly messageDataUpdater: MessageDataUpdater,
        private readonly messageDataRemover: MessageDataRemover,
    ) {
    }

    public sendMessage(data: SendMessageReq.AsObject, userId: string): Observable<void> {
        return this.messageDataProducer.sendMessage(data)
            .pipe(map(() => null));
    }

    public editMessage(data: EditMessageReq.AsObject): Observable<void> {
        return this.messageDataUpdater.updateMessage(data)
            .pipe(map(() => null));
    }

    public deleteMessage(id: string): Observable<void> {
        return this.messageDataRemover.deleteMessage(id)
            .pipe(map(() => null));
    }
}
