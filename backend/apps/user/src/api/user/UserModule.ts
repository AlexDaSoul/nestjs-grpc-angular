import { Module } from '@nestjs/common';

import { ServicesModule } from '@user/services/ServicesModule';
import { UserController } from './UserController';

@Module({
    imports: [ServicesModule],
    controllers: [UserController],
})
export class UserModule {
}
