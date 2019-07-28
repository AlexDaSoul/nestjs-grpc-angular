import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { api } from '../../grpc-proto/todo/todo.types';
import { TaskStatus } from './status.entity';

@Entity('board')
export class Board implements api.todo.Board {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({
        nullable: false,
    })
    userId: string;

    @Index()
    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        array: true,
        nullable: true,
    })
    members: string[];

    @OneToMany(type => TaskStatus, status => status.board)
    statuses: TaskStatus[];

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}
