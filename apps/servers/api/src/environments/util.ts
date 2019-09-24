export function envToNumber(
  env: string | undefined,
  defaultNumber: number
): number {
  return env && !Number.isNaN(parseInt(env, 10))
    ? parseInt(env, 10)
    : defaultNumber;
}
