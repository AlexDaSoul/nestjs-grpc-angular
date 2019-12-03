import { Module } from '@nestjs/common';

import { DbModule } from '@user/services/dal/db/DbModule';
import { DataFindersModule } from '@user/services/dal/data-finders/DataFindersModule';

import { UserDataRemover } from './UserDataRemover';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataRemover],
    exports: [UserDataRemover],
})
export class DataRemoversModule {
}
