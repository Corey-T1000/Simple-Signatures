import { Input } from './input';
import { Label } from './label';
import { Slider } from './Slider';
import { useState, useEffect } from 'react';

interface NumericSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  precision?: number;
}

export function NumericSlider({ 
  label, 
  min, 
  max, 
  step, 
  value = 0, 
  onChange,
  unit = '',
  precision = 0
}: NumericSliderProps) {
  const [inputValue, setInputValue] = useState(() => {
    // Ensure value is a number and within bounds
    const validValue = typeof value === 'number' ? value : 0;
    return Math.max(min, Math.min(max, validValue)).toFixed(precision);
  });

  useEffect(() => {
    if (typeof value === 'number' && !isNaN(value)) {
      const validValue = Math.max(min, Math.min(max, value));
      setInputValue(validValue.toFixed(precision));
    }
  }, [value, precision, min, max]);

  const handleSliderChange = ([newValue]: number[]) => {
    if (typeof newValue === 'number' && !isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue);
    }
  };

  const handleInputBlur = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue) || numericValue < min) {
      setInputValue(min.toFixed(precision));
      onChange(min);
    } else if (numericValue > max) {
      setInputValue(max.toFixed(precision));
      onChange(max);
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-20 text-right"
          />
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider
        defaultValue={[typeof value === 'number' ? value : min]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
      />
    </div>
  );
}
