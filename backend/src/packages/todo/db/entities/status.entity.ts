import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, Index,
} from 'typeorm';

import { api } from '../../grpc-proto/todo/status';
import { Task } from './task.entity';

@Entity('status')
export class TaskStatus implements api.todo.TaskStatus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        nullable: false,
    })
    userId: string;

    @Column({
        default: true,
    })
    root: boolean;

    @Column({
        nullable: false,
    })
    index: number;

    @Column({
        nullable: false,
        length: 500,
    })
    name: string;

    @OneToMany(type => Task, task => task.status)
    tasks: Task[];

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}
