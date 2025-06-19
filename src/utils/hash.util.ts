  import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash a plain password
 * @param plainPassword string
 * @returns Promise<string>
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  console.log(typeof SALT_ROUNDS);
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Compare a plain password with a hashed one
 * @param plainPassword string
 * @param hashedPassword string
 * @returns Promise<boolean>
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
