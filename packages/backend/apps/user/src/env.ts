import { ClientConfig } from 'pg';

const env = process.env;

export const SALT = env.SALT || 'SYqSuijVvyUE';

export const dbConfig: ClientConfig = {
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    user: env.DB_USERNAME || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_DATABASE_USER || 'user',
    keepAlive: true,
};

export const migrateConfig = {
    cwd: `./apps/user/src/services/dal/db`,
    env: 'user',
    string: './database.json',
};
