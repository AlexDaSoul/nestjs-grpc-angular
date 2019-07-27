import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskStatus } from './entities/status.entity';
import { Task } from './entities/task.entity';
import { Members } from './entities/members.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskStatus, Task, Members])],
    exports: [TypeOrmModule],
})
export class DbModule {}
