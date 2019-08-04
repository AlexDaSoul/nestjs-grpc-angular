import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    imports: [DbModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
