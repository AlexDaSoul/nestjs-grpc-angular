import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { createHmac } from 'crypto';
import { Exclude } from 'class-transformer';

import { SALT } from '../../env';
import { api } from '../../grpc-proto/user/user';

@Entity('user')
export class User implements api.user.User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        length: 50,
    })
    email: string;

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        default: 1,
    })
    role: number;

    @Exclude()
    @Column({
        length: 128,
        transformer: {
            from: value => value,
            to: value => createHmac('sha512', SALT).update(value).digest('hex'),
        },
    })
    password: string;

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    updatedAt: number;
}