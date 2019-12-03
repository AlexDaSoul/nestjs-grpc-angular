import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';
import { Message } from '@grpc-proto/chat/chat.types_pb';
import { EditMessageReq } from '@grpc-proto/chat/message_pb';

@Injectable()
export class MessageDataUpdater {

    constructor(
        private readonly db: Client,
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public updateMessage(data: EditMessageReq.AsObject): Observable<Message.AsObject> {
        const query = `update api_message set message = $1 where id = $2`;

        return from(this.messageDataFinder.getMessageOne(data.id)).pipe(
            switchMap(() => from(this.db.query<Message.AsObject>(query, [data.message, data.id]))),
            map(res => res.rows[0]),
        );
    }
}
