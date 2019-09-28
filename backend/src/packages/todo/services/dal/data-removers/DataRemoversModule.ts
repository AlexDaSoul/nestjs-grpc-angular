import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { StatusDataRemover } from './StatusDataRemover';
import { TaskDataRemover } from './TaskDataRemover';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [StatusDataRemover, TaskDataRemover],
    exports: [StatusDataRemover, TaskDataRemover],
})
export class DataRemoversModule {}
