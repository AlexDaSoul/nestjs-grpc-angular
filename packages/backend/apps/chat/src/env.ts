import { ClientConfig } from 'pg';

const env = process.env;

export const dbConfig: ClientConfig = {
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    user: env.DB_USERNAME || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_DATABASE_CHAT || 'chat',
    keepAlive: true,
};

export const migrateConfig = {
    cwd: `./apps/chat/src/services/dal/db`,
    env: 'chat',
    string: './database.json',
};
