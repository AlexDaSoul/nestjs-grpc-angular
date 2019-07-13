import { join } from 'path';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import entities from './db/entities';
import migrations from './db/migrations';
import subscribers from './db/subscribers';

const env = process.env;

export const grpc = {
    transport: Transport.GRPC,
    options: {
        url: '127.0.0.1:8002',
        // url: env.GRPC_TODO_SERVICE,
        package: 'api.todo',
        protoPath: join(process.cwd(), 'src/grpc-proto/todo/index.proto'),
    },
} as GrpcOptions;

export const grpcUser = {
    transport: Transport.GRPC,
    options: {
        url: '127.0.0.1:8001',
        // url: env.GRPC_USER_SERVICE,
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
