import React, { useState, useEffect } from 'react';
import { Input } from './input';

interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function NumericInput({ 
  value = 0, 
  onChange,
  min,
  max,
  step = 1,
  unit = ''
}: NumericInputProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const validateAndUpdateValue = (numericValue: number) => {
    if (isNaN(numericValue)) {
      numericValue = value;
    }

    if (min !== undefined) {
      numericValue = Math.max(min, numericValue);
    }
    if (max !== undefined) {
      numericValue = Math.min(max, numericValue);
    }

    const finalValue = Math.round(numericValue * 100) / 100; // Round to 2 decimal places
    setInputValue(String(finalValue));
    onChange(finalValue);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue);
    validateAndUpdateValue(numericValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      return;
    }

    const currentValue = parseFloat(inputValue) || value;
    let newValue = currentValue;
    const increment = e.shiftKey ? 10 : step;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newValue = currentValue + increment;
        break;
      case 'ArrowDown':
        e.preventDefault();
        newValue = currentValue - increment;
        break;
      default:
        return;
    }

    validateAndUpdateValue(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-20"
      />
      {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
    </div>
  );
}
