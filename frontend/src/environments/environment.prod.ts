import { LoggerConfig, NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    url: '/api',
    token: 'pAjjaWcqFQkr',
    authDiff: 60,
    logger: {
        level: NgxLoggerLevel.ERROR,
    } as LoggerConfig,
};
