import { Input } from './Input';
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
  value, 
  onChange,
  unit = '',
  precision = 0
}: NumericSliderProps) {
  const [inputValue, setInputValue] = useState(value.toFixed(precision));

  useEffect(() => {
    setInputValue(value.toFixed(precision));
  }, [value, precision]);

  const handleSliderChange = ([newValue]: number[]) => {
    onChange(newValue);
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
    } else {
      // Round to nearest step
      const roundedValue = Math.round(numericValue / step) * step;
      setInputValue(roundedValue.toFixed(precision));
      onChange(roundedValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 text-right"
          />
          {unit && <span className="text-sm text-muted-foreground w-6">{unit}</span>}
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleSliderChange}
      />
    </div>
  );
}
