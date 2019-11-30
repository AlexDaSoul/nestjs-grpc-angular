import { Module } from '@nestjs/common';

import { DbModule } from '@chat/services/dal/db/DbModule';
import { DataFindersModule } from '@chat/services/dal/data-finders/DataFindersModule';

import { MessageDataRemover } from './MessageDataRemover';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataRemover],
    exports: [MessageDataRemover],
})
export class DataRemoversModule {
}
