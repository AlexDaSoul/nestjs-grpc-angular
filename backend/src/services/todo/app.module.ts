import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from './env';

import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        CommonModule,
        TaskModule,
    ],
})
export class AppModule {}
