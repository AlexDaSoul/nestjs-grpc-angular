import { Module } from '@nestjs/common';

import { DbModule } from '@chat/services/dal/db/DbModule';
import { DataFindersModule } from '@chat/services/dal/data-finders/DataFindersModule';

import { MessageDataUpdater } from './MessageDataUpdater';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataUpdater],
    exports: [MessageDataUpdater],
})
export class DataUpdatersModule {
}
