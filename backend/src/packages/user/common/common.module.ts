import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { UserService } from './services/user.service';
import { JwtCertsService } from './services/jwt-certs.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, JwtCertsService],
    exports: [UserService, JwtCertsService],
})
export class CommonModule {}
