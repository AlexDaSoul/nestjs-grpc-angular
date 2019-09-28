import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env;

export const grpc = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_TODO_SERVICE || '127.0.0.1:8002',
        package: 'api.todo',
        protoPath: './grpc-proto/todo/index.proto',
    },
} as GrpcOptions;

export const typeorm = {
    type: env.TYPEORM_CONNECTION || 'postgres',
    host: env.TYPEORM_HOST || '0.0.0.0',
    port: env.TYPEORM_PORT || '5533',
    username: env.TYPEORM_USERNAME || 'postgres',
    password: env.TYPEORM_PASSWORD || 'postgres',
    database: env.TYPEORM_DATABASE || 'postgres',
    entities: [env.TYPEORM_ENTITIES] || './**/entities/*.{ts,js}',
    migrations: [env.TYPEORM_MIGRATIONS] || './**/migrations/*.{ts,js}',
    subscribers: [env.TYPEORM_SUBSCRIBERS] || './**/subscribers/*.{ts,js}',
    synchronize: JSON.parse(env.TYPEORM_SYNCHRONIZE) || true,
    logging: JSON.parse(env.TYPEORM_LOGGING) || false,
} as TypeOrmModuleOptions;
