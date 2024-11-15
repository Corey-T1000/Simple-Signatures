import { HTMLAttributes } from 'react';

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

export default function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full cursor-pointer rounded border bg-transparent p-0"
      />
    </div>
  );
}
