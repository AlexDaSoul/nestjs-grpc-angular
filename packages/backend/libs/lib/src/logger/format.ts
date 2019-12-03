export const padStart = (data: number, padNum: number = 2): string => data.toString().padStart(padNum, '0');

export const padEnd = (data: number, padNum: number = 3): string => data.toString().padEnd(padNum, '0');
