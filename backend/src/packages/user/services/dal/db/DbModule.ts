import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from '../../../env';
import { UserEntity } from './entities/UserEntity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [TypeOrmModule],
})
export class DbModule {}

export * from './entities/UserEntity';
