import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { createHmac } from 'crypto';
import env from '../../env';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true,
        length: 50,
    })
    name: string;

    @Column({
        nullable: false,
        unique: true,
        length: 50,
    })
    email: string;

    @Exclude()
    @Column({
        nullable: false,
        length: 128,
    })
    password: string;

    @CreateDateColumn({
        type: 'timestamp',
        transformer: {
            to: d => new Date(d),
            from: d => new Date(d).getTime(),
        },
    })
    createdAt: number;

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: {
            to: d => new Date(d),
            from: d => new Date(d).getTime(),
        },
    })
    updatedAt: number;

    @BeforeUpdate()
    beforeUpdate() {
        this.hashPassword();
    }

    @BeforeInsert()
    beforeInsert() {
        this.hashPassword();
    }

    @AfterLoad()
    afterLoad() {

    }

    private hashPassword(): void {
        if (this.password) {
            this.password = createHmac('sha512', env.SALT)
                .update(this.password)
                .digest('hex');
        }
    }

    public comparePasswords(userPassword: string): boolean {
        return this.password === userPassword;
    }
}
