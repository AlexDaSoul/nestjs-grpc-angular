import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { TaskController } from './task.controller';

@Module({
    imports: [CommonModule],
    controllers: [TaskController],
})
export class TaskModule {}
