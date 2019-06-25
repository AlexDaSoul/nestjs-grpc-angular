import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TaskService } from './services/task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService],
    exports: [TaskService],
})
export class CommonModule {}
