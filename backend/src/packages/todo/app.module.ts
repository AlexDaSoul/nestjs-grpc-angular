import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from './env';

import { DbModule } from './db/db.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        DbModule,
        TaskModule,
    ],
})
export class AppModule {}
