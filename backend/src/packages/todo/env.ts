import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env;

export const grpc = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_TODO_SERVICE,
        package: 'api.todo',
        protoPath: './grpc-proto/todo/index.proto',
    },
} as GrpcOptions;

export const typeorm = {
    type: env.TYPEORM_CONNECTION,
    host: env.TYPEORM_HOST,
    port: env.TYPEORM_PORT,
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
    entities: [env.TYPEORM_ENTITIES],
    migrations: [env.TYPEORM_MIGRATIONS],
    subscribers: [env.TYPEORM_SUBSCRIBERS],
    synchronize: JSON.parse(env.TYPEORM_SYNCHRONIZE),
    logging: JSON.parse(env.TYPEORM_LOGGING),
} as TypeOrmModuleOptions;
