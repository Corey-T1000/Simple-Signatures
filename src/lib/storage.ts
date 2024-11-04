import { SignatureStyle, SignatureTemplate, SignatureData } from '../types/signature';

export interface StorageData {
  theme?: 'light' | 'dark';
  style?: SignatureStyle;
  template?: SignatureTemplate;
  data?: SignatureData;
}

const STORAGE_KEY = 'signature-preferences';

export function saveToStorage(data: Partial<StorageData>) {
  const existing = getFromStorage();
  const updated = { ...existing, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getFromStorage(): StorageData {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return {};
  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
}
