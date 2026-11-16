import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDateKeyLocal(dateKey: string): Date {
  const [ys, ms, ds] = dateKey.split('-');
  const y = Number(ys);
  const mo = Number(ms);
  const d = Number(ds);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return new Date();
  return new Date(y, mo - 1, d);
}

export function formatFriendlyDate(dateKey: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof dateKey === 'string' ? parseDateKeyLocal(dateKey) : dateKey;
  return d.toLocaleDateString('en-US', options ?? {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatFullDate(dateKey: string | Date): string {
  const d = typeof dateKey === 'string' ? parseDateKeyLocal(dateKey) : dateKey;
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return getDateKey(a) === getDateKey(b);
}

export function isFutureLocalDay(date: Date, today: Date = startOfLocalDay(new Date())): boolean {
  return getDateKey(date) > getDateKey(today);
}

export function createUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getChemicalWarning(name: string, quantity: string, unit: string): string | null {
  const qty = parseFloat(quantity);
  if (isNaN(qty)) return null;
  if (name.toLowerCase().includes('glyphosate') && unit === 'GAL' && qty > 100) {
    return 'High quantity (> 100 GAL) — verify calibration before submitting';
  }
  if (name.toLowerCase().includes('surfactant') && unit === 'oz' && qty > 128) {
    return 'High quantity (> 128 oz) — exceeds recommended tank mix ratio';
  }
  return null;
}
