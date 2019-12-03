import { Module } from '@nestjs/common';

import { DalModule } from './dal/DalModule';
import { UserService } from './UserService';

@Module({
    imports: [DalModule],
    providers: [UserService],
    exports: [UserService],
})
export class ServicesModule {
}

export * from './dal/DalModule';
