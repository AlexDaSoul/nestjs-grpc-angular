import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from '../common/services/auth.service';
import { JwtCertsService } from '../common/services/jwt-certs.service';

@Module({
    imports: [CommonModule],
    controllers: [AuthController],
    providers: [AuthService, JwtCertsService],
})
export class AuthModule {}
