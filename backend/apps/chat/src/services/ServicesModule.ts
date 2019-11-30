import { Module } from '@nestjs/common';

import { DalModule } from './dal/DalModule';

@Module({
    imports: [DalModule],
    exports: [DalModule],
})
export class ServicesModule {
}

export * from './dal/DalModule';
