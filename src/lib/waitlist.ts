export const EMAIL_MAX_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  const normalized = normalizeEmail(value);
  return (
    normalized.length > 3 &&
    normalized.length <= EMAIL_MAX_LENGTH &&
    EMAIL_REGEX.test(normalized)
  );
}
