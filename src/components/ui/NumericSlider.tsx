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
}

export function NumericSlider({ label, min, max, step, value, onChange }: NumericSliderProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

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
      setInputValue(min.toString());
      onChange(min);
    } else if (numericValue > max) {
      setInputValue(max.toString());
      onChange(max);
    } else {
      // Round to nearest step
      const roundedValue = Math.round(numericValue / step) * step;
      setInputValue(roundedValue.toString());
      onChange(roundedValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-20 text-right"
        />
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
