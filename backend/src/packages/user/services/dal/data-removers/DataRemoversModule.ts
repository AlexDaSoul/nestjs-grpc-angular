import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';
import { DataFindersModule } from '../data-finders/DataFindersModule';

import { UserDataRemover } from './UserDataRemover';

@Module({
    imports: [DbModule, DataFindersModule],
    providers: [UserDataRemover],
    exports: [UserDataRemover],
})
export class DataRemoversModule {}
