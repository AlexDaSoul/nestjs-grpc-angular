import { ALLOWED_LOG_BY_LEVEL, DEFAULT_LOGGER_LEVEL, LogLevelType, LOG_LEVEL_NAME } from './constants';
import { MessageBuilder } from './message/MessageBuilder';
import { MessagePrinter } from './message/MessagePrinter';

const CURRENT_LOG_LEVEL = process.env.LOGGER_LEVEL || DEFAULT_LOGGER_LEVEL;
const CURRENT_ALLOWED_LEVELS = ALLOWED_LOG_BY_LEVEL[CURRENT_LOG_LEVEL];

export class Logger {
    private readonly messagePrinter: MessagePrinter;
    private readonly messageBuilder: MessageBuilder;

    constructor(private readonly label: string) {
        this.messageBuilder = new MessageBuilder(this.label);
        this.messagePrinter = new MessagePrinter(this.messageBuilder);
    }

    public debug(...args: any[]): void {
        this.logMessage(LOG_LEVEL_NAME.debug, args);
    }

    public info(...args: any[]): void {
        this.logMessage(LOG_LEVEL_NAME.info, args);
    }

    public error(...args: any[]): void {
        this.logMessage(LOG_LEVEL_NAME.error, args);
    }

    public security(...args: any[]): void {
        this.logMessage(LOG_LEVEL_NAME.security, args);
    }

    private logMessage(currentLevel: LogLevelType, args: any[]): void {
        if (CURRENT_ALLOWED_LEVELS.has(currentLevel)) {
            this.messagePrinter.print(currentLevel, args);
        }
    }
}
