import { Module, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import * as DBMigrate from 'db-migrate';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

import { Logger } from '@lib/logger';
import { dbConfig, migrateConfig } from '@user/env';

@Module({
    exports: [Client],
    providers: [
        {
            provide: Client,
            useFactory: () => new Client(dbConfig),
        },
    ],
})
export class DbModule implements OnModuleInit {
    private readonly logger = new Logger('DbModule');
    private readonly dbmigrate = DBMigrate.getInstance(true, migrateConfig);

    constructor(private readonly db: Client) {
    }

    onModuleInit() {
        if (this.dbmigrate) {
            from(this.dbmigrate.up())
                .pipe(take(1))
                .subscribe(
                    () => {
                        this.logger.info('Migrations applied successfully');
                        this.db.connect();
                    },
                    (error) => {
                        this.logger.error(error);
                    },
                );
        }
    }
}
