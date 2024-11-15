import { HTMLAttributes } from 'react';
import { Slider } from './slider';

export interface NumericSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
}

export default function NumericSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit,
  ...props
}: NumericSliderProps) {
  return (
    <div className="flex flex-col gap-2" {...props}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          <span className="text-sm text-gray-500">
            {value}
            {unit}
          </span>
        </div>
      )}
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}
