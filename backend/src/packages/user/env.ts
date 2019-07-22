import { join } from 'path';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { JWT_KEY_PRIV, JWT_KEY_PUB } from '@lib/jwt/keys';

import entities from './db/entities';
import migrations from './db/migrations';
import subscribers from './db/subscribers';

const env = process.env;

export const SALT = env.SALT;
export const JWT_PRIV = JWT_KEY_PRIV;
export const JWT_PUB = JWT_KEY_PUB;
export const JWT_EXPIRE = env.JWT_EXPIRE;
export const USER_EXPIRE = env.USER_EXPIRE;

export const grpc = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_USER_SERVICE,
        package: 'api.user',
        protoPath: join(process.cwd(), 'src/grpc-proto/user/index.proto'),
    },
} as GrpcOptions;

export const typeorm = {
    type: env.TYPEORM_CONNECTION,
    host: env.TYPEORM_HOST,
    port: env.TYPEORM_PORT,
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
    entities,
    migrations,
    subscribers,
    synchronize: JSON.parse(env.TYPEORM_SYNCHRONIZE),
    logging: JSON.parse(env.TYPEORM_LOGGING),
} as TypeOrmModuleOptions;
