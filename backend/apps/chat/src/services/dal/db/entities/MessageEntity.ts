import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterUpdate,
    AfterInsert,
    AfterRemove,
} from 'typeorm';
import { Observable, Subject } from 'rxjs';

import { Message, Autor } from '@grpc-proto/chat/chat.types_pb';

@Entity('api_message')
export class MessageEntity implements Message.AsObject {

    private static updates$ = new Subject<MessageEntity[]>();

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'jsonb',
    })
    author: Autor.AsObject;

    @Column({
        length: 500,
    })
    message: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    // TODO
    updatedat: string;

    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    updateTask() {

        MessageEntity.updates$.next([this]);
    }

    public static subscribe(): Observable<MessageEntity[]> {
        return MessageEntity.updates$.asObservable();
    }
}
