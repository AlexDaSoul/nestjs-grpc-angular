import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { TaskService } from './services/task.service';

@Module({
    imports: [DbModule],
    providers: [TaskService],
    exports: [TaskService],
})
export class CommonModule {}
