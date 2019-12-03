import { Module } from '@nestjs/common';

import { DalModule } from './dal/DalModule';
import { ChatEventService } from './ChatEventService';

@Module({
    imports: [DalModule],
    providers: [ChatEventService],
    exports: [DalModule, ChatEventService],
})
export class ServicesModule {
}

export * from './dal/DalModule';
