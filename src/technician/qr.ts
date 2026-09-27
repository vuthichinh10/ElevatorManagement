export function elevatorIdFromQr(raw: string): string | null {
  const value = raw.trim();
  if (/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(value)) return value;
  const match = value.match(/^https?:\/\/[^/]+\/elevators\/([A-Za-z0-9_-]+)\/?(?:[?#].*)?$/i);
  return match?.[1] || null;
}
