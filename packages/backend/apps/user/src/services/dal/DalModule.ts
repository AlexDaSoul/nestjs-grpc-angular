import { Module } from '@nestjs/common';

import { DataFindersModule } from './data-finders/DataFindersModule';
import { DataUpdatersModule } from './data-updaters/DataUpdatersModule';
import { DataProducerModule } from './data-producers/DataProducerModule';
import { DataRemoversModule } from './data-removers/DataRemoversModule';

@Module({
    imports: [DataFindersModule, DataProducerModule, DataUpdatersModule, DataRemoversModule],
    exports: [DataFindersModule, DataProducerModule, DataUpdatersModule, DataRemoversModule],
})
export class DalModule {
}
