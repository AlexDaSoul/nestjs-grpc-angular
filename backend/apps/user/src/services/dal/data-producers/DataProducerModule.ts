import { Module } from '@nestjs/common';

import { DbModule } from '@user/services/dal/db/DbModule';
import { DataFindersModule } from '@user/services/dal/data-finders/DataFindersModule';

import { UserDataProducer } from './UserDataProducer';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataProducer],
    exports: [UserDataProducer],
})
export class DataProducerModule {
}
