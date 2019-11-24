import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MessageEntity } from '../db/entities/MessageEntity';
import { MessageDataFinder } from '../data-finders/MessageDataFinder';

@Injectable()
export class MessageDataRemover {

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly messageDataFinder: MessageDataFinder,
    ) {
    }

    public deleteMessage(id: string): Observable<MessageEntity[]> {
        return this.messageDataFinder.getMessageOne(id).pipe(
            switchMap(message => from(this.messageRepository.remove([message]))),
        );
    }
}
