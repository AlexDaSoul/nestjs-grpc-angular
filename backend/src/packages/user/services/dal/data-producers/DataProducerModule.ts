import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { UserDataProducer } from './UserDataProducer';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataProducer],
    exports: [UserDataProducer],
})
export class DataProducerModule {}
