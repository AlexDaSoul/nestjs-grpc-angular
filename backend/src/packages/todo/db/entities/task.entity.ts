import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterUpdate,
    AfterInsert,
    AfterRemove,
} from 'typeorm';
import { Observable, Subject } from 'rxjs';

import { api } from '../../grpc-proto/todo/todo';

@Entity('task')
export class Task implements api.todo.Task {

    private static updates$ = new Subject<Task>();

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        type: 'text',
        nullable: false,
    })
    userId: string;

    @Column({
        nullable: false,
        length: 500,
    })
    title: string;

    @Column({
        nullable: false,
        length: 5000,
    })
    text: string;

    @Column({
        default: 1,
    })
    status: number;

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;

    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    updateTask() {
        Task.updates$.next(this);
    }

    public static subscribe(): Observable<Task> {
        return Task.updates$.asObservable();
    }
}
