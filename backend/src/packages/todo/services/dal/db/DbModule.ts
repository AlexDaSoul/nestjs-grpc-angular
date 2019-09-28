import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from '../../../env';

import { TaskStatusEntity } from './entities/StatusEntity';
import { TaskEntity } from './entities/TaskEntity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        TypeOrmModule.forFeature([TaskStatusEntity, TaskEntity]),
    ],
    exports: [TypeOrmModule],
})
export class DbModule {}
