import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AuthController } from './auth.controller';
import { JwtCertsService } from './jwt-certs.service';

@Module({
    imports: [CommonModule],
    controllers: [AuthController],
    providers: [JwtCertsService],
})
export class AuthModule {}
