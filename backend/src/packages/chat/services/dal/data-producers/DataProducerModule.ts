import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { MessageDataProducer } from './MessageDataProducer';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataProducer],
    exports: [MessageDataProducer],
})
export class DataProducerModule {}
