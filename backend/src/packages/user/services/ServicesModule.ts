import { Module } from '@nestjs/common';

import { DalModule } from './dal/DalModule';
import { UserService } from './UserService';
import { JwtCertsService } from './JwtCertsService';

@Module({
    imports: [DalModule],
    providers: [UserService, JwtCertsService],
    exports: [UserService, JwtCertsService],
})
export class ServicesModule {}

export * from './dal/DalModule';
