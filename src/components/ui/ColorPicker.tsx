import React from 'react';
import { Input } from './Input';
import { cn } from '../../lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "absolute inset-0 opacity-0 w-full h-full cursor-pointer",
            "border-0 p-0"
          )}
        />
        <div 
          className={cn(
            "w-10 h-10 rounded-md border border-input",
            "flex items-center justify-center overflow-hidden"
          )}
          style={{ backgroundColor: color }}
        />
      </div>
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
        placeholder="#000000"
      />
    </div>
  );
}
