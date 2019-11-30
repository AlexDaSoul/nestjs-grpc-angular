import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MessageEntity } from '@chat/services/dal/db/entities/MessageEntity';
import { MessageDataFinder } from '@chat/services/dal/data-finders/MessageDataFinder';

@Injectable()
export class MessageDataUpdater {

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public updateMessage(data: DeepPartial<MessageEntity>): Observable<MessageEntity> {
        return from(this.messageDataFinder.getMessageOne(data.id)).pipe(
            map(message => this.messageRepository.merge(message, data)),
            switchMap(message => from(this.messageRepository.save(message))),
        );
    }
}
