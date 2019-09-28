import { Module } from '@nestjs/common';

import { ServicesModule } from '../../services/ServicesModule';
import { UserController } from './UserController';

@Module({
    imports: [ServicesModule],
    controllers: [UserController],
})
export class UserModule {}
