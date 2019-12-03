import { Module } from '@nestjs/common';

import { ServicesModule } from '@auth/services/ServicesModule';
import { AuthController } from './AuthController';

@Module({
    imports: [ServicesModule],
    controllers: [AuthController],
})
export class AuthModule {
}
