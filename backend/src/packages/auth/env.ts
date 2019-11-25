import { Transport, GrpcOptions } from '@nestjs/microservices';

const env = process.env;

export const JWT_EXPIRE = env.JWT_EXPIRE || 600;

export const grpcAuth = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_AUTH_SERVICE || '127.0.0.1:8002',
        package: 'api.auth',
        protoPath: './grpc-proto/auth/index.proto',
    },
} as GrpcOptions;

export const grpcUser = {
    transport: Transport.GRPC,
    options: {
        url: env.GRPC_USER_SERVICE || '127.0.0.1:8001',
        package: 'api.user',
        protoPath: './grpc-proto/user/index.proto',
    },
} as GrpcOptions;
