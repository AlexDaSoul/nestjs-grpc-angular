import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [DbModule],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
