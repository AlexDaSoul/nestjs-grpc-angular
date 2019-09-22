export type LogLevelType = 'debug' | 'info' | 'error' | 'security';

export const DEFAULT_LOGGER_LEVEL = 'info';

export const ALLOWED_LOG_BY_LEVEL = {
    debug: new Set(['debug', 'info', 'error', 'security']),
    info: new Set(['info', 'error', 'security']),
    error: new Set(['error', 'security']),
    security: new Set(['security'])
};

export const LOG_LEVEL_NAME = {
    debug: <LogLevelType>'debug',
    info: <LogLevelType>'info',
    error: <LogLevelType>'error',
    security: <LogLevelType>'security'
};

export const MESSAGE_COLOR_BY_LEVEL = {
    debug: 90,
    info: 32,
    error: 31,
    security: 36
};
