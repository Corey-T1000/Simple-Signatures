import { useDropzone } from 'react-dropzone';
import { cn } from '../../lib/utils';
import { UploadCloud } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
  accept?: string[];
  maxSize?: number;
}

export function ImageUploader({
  onImageUpload,
  className,
  accept = ['image/jpeg', 'image/png', 'image/gif'],
  maxSize = 5242880, // 5MB
}: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onImageUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
        "hover:border-primary/50 hover:bg-muted/50",
        isDragActive && "border-primary bg-primary/10",
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-muted-foreground" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {isDragActive ? (
            "Drop the image here"
          ) : (
            <>
              Drag & drop an image here, or <span className="text-primary">browse</span>
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supported formats: {accept.join(', ')}
        </p>
        <p className="text-xs text-muted-foreground">
          Max size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>
    </div>
  );
}
