import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskStatus } from './entities/status.entity';
import { Task } from './entities/task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskStatus, Task])],
})
export class DbModule {}
