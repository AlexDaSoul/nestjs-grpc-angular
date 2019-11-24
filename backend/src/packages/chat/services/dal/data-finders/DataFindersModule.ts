import { Module } from '@nestjs/common';

import { DbModule } from '../db/DbModule';

import { MessageDataFinder } from './MessageDataFinder';

@Module({
    imports: [DbModule],
    providers: [MessageDataFinder],
    exports: [MessageDataFinder],
})
export class DataFindersModule {}
