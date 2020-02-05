export function secondsToExpiresAtMillis(seconds: number) {
  return new Date().valueOf() + secondsToMilli(seconds);
}

export function secondsToMilli(seconds: number) {
  return seconds * 1000;
}
