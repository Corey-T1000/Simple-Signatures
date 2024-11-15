import { AlertCircle } from 'lucide-react';

interface ColorWarningProps {
  show: boolean;
}

export function ColorWarning({ show }: ColorWarningProps) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 mt-2 animate-in fade-in">
      <AlertCircle className="h-4 w-4" />
      <span>Selected color may have poor contrast</span>
    </div>
  );
}
