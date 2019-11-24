import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1574538331710 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table if not exists api_user (
                id uuid default uuid_generate_v4() not null,
                email varchar(50) not null,
                name varchar(50) not null,
                avatar varchar(500),
                password varchar(128) not null,
                "createdAt" timestamp default now() not null,
                "updatedAt" timestamp default now() not null,
                constraint PK_USERS
                    primary key (id),
                constraint UQ_USERS__EMAIL
                    unique (email)
            );
        `);
    }


    public async down(queryRunner: QueryRunner): Promise<any> {
        await Promise.resolve();
    }

}
