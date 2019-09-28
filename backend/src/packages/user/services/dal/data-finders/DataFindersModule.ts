import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';

import { UserDataFinder } from './UserDataFinder';

@Module({
    imports: [DbModule],
    providers: [UserDataFinder],
    exports: [UserDataFinder],
})
export class DataFindersModule {}
