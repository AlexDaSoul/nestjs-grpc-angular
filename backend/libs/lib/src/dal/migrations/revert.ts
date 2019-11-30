import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { typeorm } from '../../../env';
import { Logger } from '../../logger';

// cli migrations:revert work only with generated migration in *.js files, so we need start revert migrations programmatically
// for reverting last schema migrations ---> npm run migrations:revert

(async () => {
    let connection: Connection;
    const logger = new Logger('MigrateRevert');

    try {
        connection = await createConnection({...(typeorm as ConnectionOptions), logging: false});
        await connection.undoLastMigration();
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
