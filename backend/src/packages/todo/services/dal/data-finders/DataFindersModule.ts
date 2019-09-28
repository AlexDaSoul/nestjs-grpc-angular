import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';

import { StatusDataFinder } from './StatusDataFinder';
import { TaskDataFinder } from './TaskDataFinder';

@Module({
    imports: [DbModule],
    providers: [StatusDataFinder, TaskDataFinder],
    exports: [StatusDataFinder, TaskDataFinder],
})
export class DataFindersModule {}
