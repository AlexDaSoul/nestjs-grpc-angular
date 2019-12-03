// about colorizing messages in stdout see: https://stackoverflow.com/a/41407246

import { MESSAGE_COLOR_BY_LEVEL } from '../constants';

const DEFAULT_COLOR = MESSAGE_COLOR_BY_LEVEL.info;
const TIMESTAMP_COLOR = '50';
const LABEL_COLOR = '33';

export function colorizeTimestamp(timestamp: string): string {
    return colorize(TIMESTAMP_COLOR, timestamp);
}

export function colorizeLevel(level: string): string {
    return colorize(MESSAGE_COLOR_BY_LEVEL[level] || DEFAULT_COLOR, level);
}

export function colorizeLabel(label: string): string {
    return colorize(LABEL_COLOR, label);
}

export function colorizeMessage(level: string, message: string): string {
    return colorize(MESSAGE_COLOR_BY_LEVEL[level] || DEFAULT_COLOR, message);
}

function colorize(color: string, message: string): string {
    return ['\x1b[', color, 'm', message, '\x1b[0m'].join('');
}
