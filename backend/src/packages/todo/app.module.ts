import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from './env';

import { DbModule } from './db/db.module';
import { StatusModule } from './status/status.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        DbModule,
        StatusModule,
        TaskModule,
    ],
})
export class AppModule {}