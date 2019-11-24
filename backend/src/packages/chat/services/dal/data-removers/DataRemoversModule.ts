import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { MessageDataRemover } from './MessageDataRemover';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [MessageDataRemover],
    exports: [MessageDataRemover],
})
export class DataRemoversModule {}
