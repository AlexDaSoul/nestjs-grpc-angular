import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { StatusDataProducer } from './StatusDataProducer';
import { TaskDataProducer } from './TaskDataProducer';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [StatusDataProducer, TaskDataProducer],
    exports: [StatusDataProducer, TaskDataProducer],
})
export class DataProducerModule {}
