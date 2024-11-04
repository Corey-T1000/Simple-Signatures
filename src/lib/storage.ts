import { SignatureStyle, SignatureTemplate, SignatureElement } from '../types/signature';

const STORAGE_KEY = "simple-signatures-preferences";

interface StorageData {
  theme: "light" | "dark";
  style: SignatureStyle;
  template: SignatureTemplate;
  elements: SignatureElement[];
}

const defaultData: StorageData = {
  theme: "light",
  style: {
    fontFamily: 'Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    primaryColor: '#0F172A',
    secondaryColor: '#3B82F6',
    imageFit: 'cover'
  },
  template: {
    name: 'modern',
    layout: 'horizontal',
    imageStyle: 'rounded',
    contentStyle: 'compact',
    ctaLayout: 'stacked',
    showIcons: false,
    iconStyle: 'outline',
    imageAlignment: 'start',
    imageScale: 0.7,
    imageFit: 'cover',
    padding: {
      top: 12,
      right: 0,
      bottom: 12,
      left: 0
    }
  },
  elements: []
};

export function saveToStorage(data: Partial<StorageData>): void {
  try {
    const currentData = getFromStorage();
    const mergedData = {
      ...defaultData,
      ...currentData,
      ...data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}

export function getFromStorage(): Partial<StorageData> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    return JSON.parse(data) as StorageData;
  } catch (error) {
    console.error("Error reading from local storage:", error);
    return {};
  }
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
}

export function updateStorageItem<K extends keyof StorageData>(
  key: K,
  value: StorageData[K]
): void {
  try {
    const currentData = getFromStorage();
    saveToStorage({
      ...currentData,
      [key]: value,
    });
  } catch (error) {
    console.error("Error updating storage item:", error);
  }
}

export function getStorageItem<K extends keyof StorageData>(
  key: K
): StorageData[K] | undefined {
  try {
    const data = getFromStorage();
    return data[key];
  } catch (error) {
    console.error("Error getting storage item:", error);
    return undefined;
  }
}
