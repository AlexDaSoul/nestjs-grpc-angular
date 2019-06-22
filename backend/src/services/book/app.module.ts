import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import env from './env';

import { CommonModule } from './common/common.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(env.typeorm),
        CommonModule,
    ],
})
export class AppModule {}
