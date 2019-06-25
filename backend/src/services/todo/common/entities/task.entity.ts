import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { api } from '../../grpc-proto/todo/todo';

@Entity('task')
export class Task implements api.todo.Task {
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
        default: 0,
    })
    status: number;

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}
