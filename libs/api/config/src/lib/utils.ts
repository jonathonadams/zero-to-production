export function getEnvVariableOrExit(envVariable: string): string {
  const env: string | undefined = process.env[envVariable];
  if (!env) {
    console.error(`${envVariable} environment variable is not set`);
    console.error('Exiting server with error code 1');
    process.exit(1);
  }
  return env as string;
}

export function envToNumber(
  env: string | undefined,
  defaultNumber: number
): number {
  return env && !Number.isNaN(parseInt(env, 10))
    ? parseInt(env, 10)
    : defaultNumber;
}
