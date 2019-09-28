import { Module } from '@nestjs/common';

import { ServicesModule } from '../../services/ServicesModule';

import { TaskController } from './TaskController';
import { TaskService } from './TaskService';

@Module({
    imports: [ServicesModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
