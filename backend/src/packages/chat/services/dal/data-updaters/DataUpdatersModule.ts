import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { MessageDataUpdater } from './MessageDataUpdater';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataUpdater],
    exports: [MessageDataUpdater],
})
export class DataUpdatersModule {}
