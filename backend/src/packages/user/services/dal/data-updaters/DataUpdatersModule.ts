import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { UserDataUpdater } from './UserDataUpdater';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataUpdater],
    exports: [UserDataUpdater],
})
export class DataUpdatersModule {}
