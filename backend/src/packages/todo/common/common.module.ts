import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { StatusService } from './services/status.service';
import { TaskService } from './services/task.service';

@Module({
    imports: [DbModule],
    providers: [TaskService, StatusService],
    exports: [TaskService, StatusService],
})
export class CommonModule {}
