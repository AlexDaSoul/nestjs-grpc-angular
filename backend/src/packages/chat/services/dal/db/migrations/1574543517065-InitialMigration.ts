import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1574543517065 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table if not exists api_message (
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                author JSONB NOT NULL,
                message VARCHAR(500) NOT NULL,
                "createdAt" TIMESTAMP DEFAULT now() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT now() NOT NULL,
                CONSTRAINT "PK_MESSAGES"
                    PRIMARY KEY (id)
            );
            
            CREATE INDEX IF NOT EXISTS IDX_AUTOR_ID
                ON api_message USING GIN ((author -> 'userid'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await Promise.resolve();
    }
}
