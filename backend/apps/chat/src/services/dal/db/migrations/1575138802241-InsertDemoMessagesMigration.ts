import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDemoMessagesMigration1575138802241 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable:max-line-length
        await queryRunner.query(`
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('b231aa7f-68dd-483f-9110-50590f216b57', '{"id": "bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc", "name": "John Doe", "avatar": "assets/avatar/avatar-2.png"}', 'Hi! :)
            ', '2019-11-30 18:21:36.537860', '2019-11-30 18:21:36.537860');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('daeb5002-686e-4f35-b853-103e472740f4', '{"id": "34e9e3e5-56e9-4e71-9b3c-13292915970b", "name": "Anna Smith", "avatar": "assets/avatar/avatar-1.png"}', 'Hi John! *)', '2019-11-30 18:21:53.334637', '2019-11-30 18:21:53.334637');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('625494b7-ada5-4551-91bd-33c1ffd66e32', '{"id": "bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc", "name": "John Doe", "avatar": "assets/avatar/avatar-2.png"}', 'How are you?', '2019-11-30 18:22:08.184094', '2019-11-30 18:22:08.184094');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('860ac77e-4090-4a67-a28d-f891b83a0556', '{"id": "bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc", "name": "John Doe", "avatar": "assets/avatar/avatar-2.png"}', 'What are your plans for the evening?', '2019-11-30 18:22:44.322058', '2019-11-30 18:22:44.322058');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('56829dd3-edf5-4537-a9c7-a00bdd619747', '{"id": "34e9e3e5-56e9-4e71-9b3c-13292915970b", "name": "Anna Smith", "avatar": "assets/avatar/avatar-1.png"}', 'I''m fine
            ', '2019-11-30 18:23:06.294880', '2019-11-30 18:23:06.294880');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('fe95451d-dedd-492b-b9ce-8d1c8b881bd1', '{"id": "34e9e3e5-56e9-4e71-9b3c-13292915970b", "name": "Anna Smith", "avatar": "assets/avatar/avatar-1.png"}', 'I''m going to go to the movies. Come with me :)', '2019-11-30 18:24:08.900434', '2019-11-30 18:24:08.900434');
            insert into api_message (id, author, message, "createdAt", "updatedAt") values ('c4b5fc4a-28e6-4e18-a0ff-4bb4e1bd590d', '{"id": "bb6d88c8-d705-4c10-b1a1-08ea1b94d4cc", "name": "John Doe", "avatar": "assets/avatar/avatar-2.png"}', 'Sure! Thanks', '2019-11-30 18:25:42.860062', '2019-11-30 18:25:42.860062');
        `);
        // tslint:enable:max-line-length
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return Promise.resolve();
    }
}
