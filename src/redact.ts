/**
 * Payload redaction utilities
 *
 * Prevents PII from leaking into error messages and logs by summarizing
 * payloads instead of JSON.stringify-ing full object contents.
 */

/**
 * Redacts potentially sensitive values in an object and summarizes nested structures.
 * Returns a safe-to-log summary string.
 */
export function summarizePayload(payload: unknown): string {
  if (payload === void 0) {
    return 'undefined';
  }
  if (payload === null) {
    return 'null';
  }
  if (typeof payload === 'string') {
    return payload.length > 100 ? `"${payload.slice(0, 100)}…[truncated]"` : `"${payload}"`;
  }
  if (typeof payload === 'number' || typeof payload === 'boolean') {
    return String(payload);
  }
  if (Array.isArray(payload)) {
    return `[Array(${payload.length})]`;
  }
  if (typeof payload === 'object') {
    const keys = Object.keys(payload);
    const summary: Record<string, string> = {};
    for (const key of keys.slice(0, 10)) {
      const value = (payload as Record<string, unknown>)[key];
      summary[key] = typeofSummary(key, value);
    }
    if (keys.length > 10) {
      summary[`...(+${keys.length - 10} more)`] = 'omitted';
    }
    return JSON.stringify(summary);
  }
  return String(payload);
}

/**
 * Summarizes a key for safe logging. Shows kt/pk structure but redacts actual key values.
 */
export function summarizeKey(key: unknown): string {
  if (!key || typeof key !== 'object') {
    return String(key);
  }
  const k = key as Record<string, unknown>;
  const kt = k.kt ?? '?';
  const pk = k.pk != null ? `[${typeof k.pk}]` : '?';
  if (Array.isArray(k.loc)) {
    const locSummary = k.loc
      .map((l: Record<string, unknown>) => `{ kt: ${l.kt ?? '?'}, lk: [${typeof l.lk}] }`)
      .join(', ');
    return `{ kt: ${kt}, pk: ${pk}, loc: [${locSummary}] }`;
  }
  return `{ kt: ${kt}, pk: ${pk} }`;
}

/**
 * Returns a type-based summary for a value, redacting sensitive fields.
 */
function typeofSummary(key: string, value: unknown): string {
  const sensitivePattern = /^(password|passwd|secret|token|accessToken|refreshToken|authorization|apiKey|api_key|credential|credentials|auth)$/i;
  if (sensitivePattern.test(key)) {
    return '[REDACTED]';
  }
  if (value === null) return 'null';
  if (value === void 0) return 'undefined';
  if (typeof value === 'string') {
    return value.length > 100 ? `"${value.slice(0, 100)}…[truncated]"` : `"${value}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return `[Array(${value.length})]`;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object') {
    return '[Object]';
  }
  return typeof value;
}
