import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { api } from '../../grpc-proto/todo/todo.types';
import { TaskStatus } from './status.entity';
import { Task } from './task.entity';

@Entity('members')
export class Members implements api.todo.Members {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        nullable: false,
    })
    userId: string;

    @Column({type: 'text', array: true, nullable: true })
    members: string[];

    @ManyToOne(type => TaskStatus, status => status.members)
    @JoinColumn()
    status: string;

    @ManyToOne(type => Task, status => status.members)
    @JoinColumn()
    task: string;

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}
