import { Transport, GrpcOptions } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { JWT_KEY_PRIV, JWT_KEY_PUB } from './lib/jwt/keys';

const processEnv = process.env;
const env = {
    SALT: processEnv.SALT,

    JWT_EXPIRE: processEnv.JWT_EXPIRE,
    JWT_PRIV: JWT_KEY_PRIV,
    JWT_PUB: JWT_KEY_PUB,

    USER_EXPIRE: processEnv.USER_EXPIRE || 900,

    grpc: {
        transport: Transport.GRPC,
        options: {
            url: processEnv.GRPC_BOOK_SERVICE,
            package: 'api.book',
            protoPath: './grpc-proto/book/index.proto',
        },
    } as GrpcOptions,

    typeorm: {
        type: processEnv.TYPEORM_CONNECTION || 'postgres',
        host: processEnv.TYPEORM_HOST || 'localhost',
        port: processEnv.TYPEORM_PORT || 5432,
        username: processEnv.TYPEORM_USERNAME || 'postgres',
        password: processEnv.TYPEORM_PASSWORD || 'postgres',
        database: processEnv.TYPEORM_DATABASE || 'postgres',
        entities: [processEnv.TYPEORM_ENTITIES || './**/*.entity.{ts,js}'],
        migrations: [processEnv.TYPEORM_MIGRATIONS || './**/*.migration.{ts,js}'],
        synchronize: processEnv.TYPEORM_SYNCHRONIZE === 'true',
        logging: processEnv.TYPEORM_LOGGING === 'true',
    } as TypeOrmModuleOptions,
};

export default env;
