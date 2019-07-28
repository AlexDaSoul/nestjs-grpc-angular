import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { BoardController } from './board.controller';

@Module({
    imports: [CommonModule],
    controllers: [BoardController],
})
export class BoardModule {}
