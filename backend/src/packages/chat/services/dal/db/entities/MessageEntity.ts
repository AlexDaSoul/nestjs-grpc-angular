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
import { Observable, BehaviorSubject } from 'rxjs';

import { Message, Autor } from '../../../../grpc-proto/chat/chat.types_pb';

@Entity('api_message')
export class MessageEntity implements Message.AsObject {

    private static updates$ = new BehaviorSubject<MessageEntity[]>([]);

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

    date: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    updateTask() {
        this.date = this.createdAt;

        MessageEntity.updates$.next([this]);
    }

    public static subscribe(): Observable<MessageEntity[]> {
        return MessageEntity.updates$.asObservable();
    }
}
