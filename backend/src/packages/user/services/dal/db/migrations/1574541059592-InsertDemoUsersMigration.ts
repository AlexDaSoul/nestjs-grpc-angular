import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDemoUsersMigration1574541059592 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            insert into api_user (id, email, name, avatar, password, "createdAt", "updatedAt") values ('bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc', 'johndoe@mail.com', 'John Doe', '', '02716d833fd650ac2bbab073b01c27afc8260a64192ed6a176c78b24ddbaa10f3343ebbcc015b8b0402aebe91007444a6148328e1a5203cb78ec488f8da31c6c', '2019-11-17 14:40:20.763852', '2019-11-17 14:40:20.763852');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await Promise.resolve();
    }

}
