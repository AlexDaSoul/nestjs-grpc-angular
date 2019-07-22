import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([...entities])],
})
export class DbModule {}
