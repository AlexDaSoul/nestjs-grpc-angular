export const curUnixTime: number = Math.floor(new Date().getTime() / 1000);

export const daysFromNow = (days: number = 0) => ({seconds: curUnixTime - 60 * 60 * 24 * days});
