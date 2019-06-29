import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
})
export class DbModule {}
