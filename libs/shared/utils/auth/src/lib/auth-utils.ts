/**
 * Move into a shared utils function
 */
export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 6 &&
    /\d/.test(password) &&
    /\D/.test(password)
  );
}
