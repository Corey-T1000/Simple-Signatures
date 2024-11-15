import { SignatureStyle, SignatureTemplate, SignatureData, ImageSettings } from '../types/signature';
import { defaultSignatureData, defaultStyle, defaultTemplate, defaultImageSettings } from './defaults';

export interface StorageData {
  theme?: 'light' | 'dark';
  style?: SignatureStyle;
  template?: SignatureTemplate;
  data?: SignatureData;
  imageSettings?: ImageSettings;
  version?: number;
}

const STORAGE_KEY = 'signature-preferences';
const CURRENT_VERSION = 1; // Increment this when making breaking changes to state structure

export function validateState(state: StorageData): StorageData {
  // If no version or old version, return defaults
  if (!state.version || state.version < CURRENT_VERSION) {
    return {
      theme: 'light',
      style: defaultStyle,
      template: defaultTemplate,
      data: defaultSignatureData,
      imageSettings: defaultImageSettings,
      version: CURRENT_VERSION
    };
  }

  // Ensure template has all required fields
  if (state.template) {
    const hasAllFields = defaultTemplate.fieldOrder.every(defaultField =>
      state.template?.fieldOrder.some(field => field.type === defaultField.type)
    );
    
    if (!hasAllFields) {
      state.template = defaultTemplate;
    }
  }

  return state;
}

export function saveToStorage(data: Partial<StorageData>) {
  const existing = getFromStorage();
  const updated = { ...existing, ...data, version: CURRENT_VERSION };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getFromStorage(): StorageData {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return {};
  try {
    const parsed = JSON.parse(saved);
    return validateState(parsed);
  } catch {
    return {};
  }
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
