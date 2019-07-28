import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { StatusService } from './services/status.service';
import { TaskService } from './services/task.service';
import { BoardService } from './services/board.service';

@Module({
    imports: [DbModule],
    providers: [TaskService, StatusService, BoardService],
    exports: [TaskService, StatusService, BoardService],
})
export class CommonModule {}
