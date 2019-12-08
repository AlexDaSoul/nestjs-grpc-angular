import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { api as chatApi } from '@grpc-proto/chat/message';
import { api as chatTypes } from '@grpc-proto/chat/chat.types';
import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';

@Injectable()
export class MessageDataUpdater {

    constructor(
        private readonly db: Client,
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public updateMessage(data: chatApi.chat.EditMessageReq): Observable<chatTypes.chat.Message> {
        const query = `update api_message set message = $1 where id = $2`;

        return from(this.messageDataFinder.getMessageOne(data.id)).pipe(
            switchMap(() => from(this.db.query<chatTypes.chat.Message>(query, [data.message, data.id]))),
            map(res => res.rows[0]),
        );
    }
}
