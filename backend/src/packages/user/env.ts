import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env;

export const SALT = env.SALT || 'SYqSuijVvyUE';

export const grpc = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_USER_SERVICE || '127.0.0.1:8001',
        package: 'api.user',
        protoPath: './grpc-proto/user/index.proto',
    },
} as GrpcOptions;

export const grpcAuth = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_AUTH_SERVICE || '127.0.0.1:8002',
        package: 'api.auth',
        protoPath: './grpc-proto/auth/index.proto',
    },
} as GrpcOptions;

export const typeorm = {
    type: env.TYPEORM_CONNECTION || 'postgres',
    host: env.TYPEORM_HOST || 'localhost',
    port: env.TYPEORM_PORT || '5432',
    database: env.TYPEORM_DATABASE_USER || 'user',
    username: env.TYPEORM_USERNAME || 'postgres',
    password: env.TYPEORM_PASSWORD || 'postgres',
    entities: [env.TYPEORM_ENTITIES || './**/entities/*.{ts,js}'],
    migrations: [env.TYPEORM_MIGRATIONS || './**/migrations/*.{ts,js}'],
    subscribers: [env.TYPEORM_SUBSCRIBERS || './**/subscribers/*.{ts,js}'],
    synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
    logging: env.TYPEORM_LOGGING === 'true',
    cli: {
        migrationsDir: env.TYPEORM_MIGRATIONS || './**/migrations/*.{ts,js}',
        subscribersDir: env.TYPEORM_SUBSCRIBERS || './**/subscribers/*.{ts,js}',
    },
} as TypeOrmModuleOptions;
