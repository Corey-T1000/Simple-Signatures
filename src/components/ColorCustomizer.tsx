import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { SignatureStyle } from '../types/signature';
import { Palette, RotateCcw } from 'lucide-react';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { defaultStyle } from '../lib/defaults';

interface ColorCustomizerProps {
  style: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
}

const presetColors = [
  { name: 'Slate', primary: '#0f172a', secondary: '#64748b' },
  { name: 'Gray', primary: '#18181b', secondary: '#71717a' },
  { name: 'Zinc', primary: '#18181b', secondary: '#71717a' },
  { name: 'Blue', primary: '#1e40af', secondary: '#60a5fa' },
  { name: 'Green', primary: '#166534', secondary: '#4ade80' },
  { name: 'Red', primary: '#991b1b', secondary: '#f87171' },
  { name: 'Purple', primary: '#6b21a8', secondary: '#c084fc' },
  { name: 'Orange', primary: '#9a3412', secondary: '#fb923c' },
];

export function ColorCustomizer({ style, onChange }: ColorCustomizerProps) {
  const resetColors = () => {
    onChange({
      ...style,
      primaryColor: defaultStyle.primaryColor,
      secondaryColor: defaultStyle.secondaryColor,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Color Settings</CardTitle>
            <CardDescription>Choose colors for your signature text</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetColors}
                  className="h-8 w-8"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset to default colors</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4" />
              Color Presets
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((preset) => (
                <TooltipProvider key={preset.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 w-full p-0 border-2"
                        style={{
                          background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.secondary} 50%)`,
                        }}
                        onClick={() => onChange({
                          ...style,
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary,
                        })}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{preset.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Primary Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={style.primaryColor}
                  onChange={(e) =>
                    onChange({
                      ...style,
                      primaryColor: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-md cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Secondary Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={style.secondaryColor}
                  onChange={(e) =>
                    onChange({
                      ...style,
                      secondaryColor: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
