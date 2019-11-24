import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { typeorm } from '../../../env';
import { Logger } from '../../logger';

// cli migrations:run work only with generated migration in *.js files, so we need start migrations programmatically.
// after entity schema change you need generate schema migrations --> npm run migrations:generate MigrationName
// for starting schema migrations ---> npm run migrations:run

(async () => {
    let connection: Connection;
    const logger = new Logger('Migrate');

    try {
        connection = await createConnection({ ...(typeorm as ConnectionOptions), logging: false });
        await connection.runMigrations({ transaction: 'each' });
    } catch (error) {
        if (error.name !== 'AlreadyHasActiveConnectionError') {
            logger.error('Error while execute migrations', error.message);
        }

        return error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
})();
