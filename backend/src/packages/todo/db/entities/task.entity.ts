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
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Observable, BehaviorSubject } from 'rxjs';

import { api } from '../../grpc-proto/todo/todo.types';
import { TaskStatus } from './status.entity';
import { Members } from './members.entity';

@Entity('task')
export class Task implements api.todo.Task {

    private static updates$ = new BehaviorSubject<Task>(null);

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

    @OneToMany(type => Members, task => task.task)
    members: Members[];

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
