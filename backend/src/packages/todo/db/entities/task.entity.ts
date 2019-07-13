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
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Observable, Subject } from 'rxjs';

import { api } from '@grpc/todo/task';
import { TaskStatus } from './status.entity';

@Entity('task')
export class Task implements api.todo.Task {

    private static updates$ = new Subject<Task>();

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
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
        length: 10000,
    })
    description: string;

    @Column({
        default: 0,
    })
    index: number;

    @ManyToOne(type => TaskStatus, status => status.tasks)
    @JoinColumn()
    status: string;

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
