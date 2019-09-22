import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Index,
} from 'typeorm';

import { TaskStatus } from '../../grpc-proto/todo/todo.types_pb';
import { TaskEntity } from './task.entity';

@Entity('status')
export class TaskStatusEntity implements TaskStatus.AsObject {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        nullable: false,
    })
    userid: string;

    @Column({
        nullable: false,
    })
    index: number;

    @Column({
        nullable: false,
        length: 500,
    })
    name: string;

    @OneToMany(type => TaskEntity, task => task.status)
    tasksList: TaskEntity[];

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}
