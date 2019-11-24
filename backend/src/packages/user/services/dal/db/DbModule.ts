import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { from } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Logger } from '../../../lib/logger';

import { typeorm } from '../../../env';

import { UserEntity } from './entities/UserEntity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [TypeOrmModule],
})
export class DbModule implements OnModuleInit {
    private readonly logger = new Logger('DbModule');

    constructor(
        private readonly connection: Connection,
    ) {}

    public onModuleInit(): Promise<any> {
        if (this.connection.isConnected) {
            return from(this.connection.runMigrations({ transaction: 'each' }))
                .pipe(
                    tap(() => {
                        this.logger.info('Migrations applied successfully');
                    }),
                    take(1),
                )
                .toPromise();
        }

        return Promise.resolve(true);
    }
}

export * from './entities/UserEntity';
