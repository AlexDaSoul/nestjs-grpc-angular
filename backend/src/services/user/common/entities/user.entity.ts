import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { createHmac } from 'crypto';

import { SALT } from '../../env';
import { api } from '../../grpc-proto/user/user';

@Entity('user')
export class User implements api.user.User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        length: 50,
    })
    name: string;

    @Column({
        nullable: true,
        length: 2000,
    })
    avatar: string;

    @Exclude()
    @Column({
        nullable: false,
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
