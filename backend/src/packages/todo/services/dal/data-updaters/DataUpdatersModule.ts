import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { StatusDataUpdater } from './StatusDataUpdater';
import { TaskDataUpdater } from './TaskDataUpdater';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [StatusDataUpdater, TaskDataUpdater],
    exports: [StatusDataUpdater, TaskDataUpdater],
})
export class DataUpdatersModule {}
