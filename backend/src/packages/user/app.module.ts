import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from './env';

import { CommonModule } from './common/common.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        CommonModule,
        AuthModule,
        UserModule,
    ],
})
export class AppModule {}
