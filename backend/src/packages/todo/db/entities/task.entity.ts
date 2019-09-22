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
import { Observable, BehaviorSubject } from 'rxjs';

import { Task } from '../../grpc-proto/todo/todo.types_pb';
import { TaskStatusEntity } from './status.entity';

@Entity('task')
export class TaskEntity implements Task.AsObject {

    private static updates$ = new BehaviorSubject<TaskEntity>(null);

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        nullable: false,
    })
    userid: string;

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
        nullable: false,
        default: 'Unassigned',
    })
    assign: string;

    @Column({
        default: 0,
    })
    index: number;

    @ManyToOne(type => TaskStatusEntity, status => status.tasksList)
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
        TaskEntity.updates$.next(this);
    }

    public static subscribe(): Observable<TaskEntity> {
        return TaskEntity.updates$.asObservable();
    }
}
