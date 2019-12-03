import { Module } from '@nestjs/common';

import { DbModule } from '@chat/services/dal/db/DbModule';
import { DataFindersModule } from '@chat/services/dal/data-finders/DataFindersModule';

import { MessageDataProducer } from './MessageDataProducer';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataProducer],
    exports: [MessageDataProducer],
})
export class DataProducerModule {
}
