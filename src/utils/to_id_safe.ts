export function makeSafeForHTMLID(input: string): string {
  return input
    .toLowerCase() // Convert to lower case
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-z0-9_-]/g, '') // Remove unsafe characters
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens
}
