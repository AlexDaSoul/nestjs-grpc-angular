import { Module } from '@nestjs/common';

import { DbModule } from '@user/services/dal/db/DbModule';
import { DataFindersModule } from '@user/services/dal/data-finders/DataFindersModule';

import { UserDataUpdater } from './UserDataUpdater';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataUpdater],
    exports: [UserDataUpdater],
})
export class DataUpdatersModule {
}
