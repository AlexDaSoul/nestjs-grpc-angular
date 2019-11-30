import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDemoUsersMigration1574541059592 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable:max-line-length
        await queryRunner.query(`
            insert into api_user (id, email, name, avatar, password, "createdAt", "updatedAt") values ('bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc', 'johndoe@mail.com', 'John Doe', 'assets/avatar/avatar-2.png', 'aaee7630e579489b58e9e5933d144c6cdb14cb1d30314b0eb97379f837b46726dd5bc4fe02b32e4265812a58d61524987552423a56b1d94e8f6ffc1d170a29c7', '2019-11-17 14:40:20.763852', '2019-11-17 14:40:20.763852');

            insert into api_user (id, email, name, avatar, password, "createdAt", "updatedAt") values ('34e9e3e5-56e9-4e71-9b3c-13292915970b', 'anna@mail.com', 'Anna Smith', 'assets/avatar/avatar-1.png', 'aaee7630e579489b58e9e5933d144c6cdb14cb1d30314b0eb97379f837b46726dd5bc4fe02b32e4265812a58d61524987552423a56b1d94e8f6ffc1d170a29c7', '2019-11-17 14:40:20.763852', '2019-11-17 14:40:20.763852');
        `);
        // tslint:enable:max-line-length
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await Promise.resolve();
    }

}
