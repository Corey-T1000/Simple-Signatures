import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { parseSignatureHtml } from '../utils/parseHtml';
import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';
import { AlertCircle } from 'lucide-react';

interface ImportSignatureProps {
  onImport: (data: SignatureData, style: SignatureStyle, template: SignatureTemplate) => void;
}

export function ImportSignature({ onImport }: ImportSignatureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    try {
      const result = parseSignatureHtml(code);
      if (!result) {
        setError('Invalid signature code. Please make sure you\'re pasting the complete HTML code.');
        return;
      }

      const { data, style, template } = result;
      onImport(data, style, template);
      setIsOpen(false);
      setCode('');
      setError('');
    } catch {
      setError('Failed to parse signature code. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Import Signature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Signature</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Paste your signature HTML code here..."
              value={code}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCode(e.target.value);
                setError('');
              }}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setCode('');
                setError('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!code.trim()}>
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
