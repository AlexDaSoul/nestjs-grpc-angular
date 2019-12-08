import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';

import { api } from '@grpc-proto/chat/chat.types';
import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';

@Injectable()
export class MessageDataRemover {

    constructor(
        private readonly db: Client,
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public deleteMessage(id: string): Observable<void> {
        const query = `delete from api_message where id = $1`;

        return this.messageDataFinder.getMessageOne(id).pipe(
            switchMap(() => from(this.db.query<api.chat.Message>(query, [id]))),
            mapTo(null),
        );
    }
}
