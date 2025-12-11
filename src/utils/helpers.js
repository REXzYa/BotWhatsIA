export function normalizeText(text = '') {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function isNumericOption(text = '') {
  const normalized = text.trim();
  if (!normalized) return false;
  const value = Number(normalized);
  return Number.isInteger(value) ? value : false;
}
