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
    type: env.TYPEORM_CONNECTION || 'postgres',
        host: env.TYPEORM_HOST || 'localhost',
        port: env.TYPEORM_PORT || 5432,
        username: env.TYPEORM_USERNAME || 'postgres',
        password: env.TYPEORM_PASSWORD || 'postgres',
        database: env.TYPEORM_DATABASE || 'postgres',
        entities: [env.TYPEORM_ENTITIES || './**/*.entity.{ts,js}'],
        migrations: [env.TYPEORM_MIGRATIONS || './**/*.migration.{ts,js}'],
        synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
        logging: env.TYPEORM_LOGGING === 'true',
} as TypeOrmModuleOptions;

export default env;
