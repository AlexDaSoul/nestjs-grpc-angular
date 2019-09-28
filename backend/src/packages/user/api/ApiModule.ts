import { Module } from '@nestjs/common';

import { UserModule } from './user/UserModule';
import { AuthModule } from './auth/AuthModule';

@Module({
    imports: [UserModule, AuthModule],
    exports: [UserModule, AuthModule],
})
export class ApiModule {}
