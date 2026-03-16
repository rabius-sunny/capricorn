'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2, UploadCloud } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const auth = (await fetch('/api/imagekit/auth').then((r) =>
        r.json()
      )) as {
        token: string;
        expire: string;
        signature: string;
        publicKey: string;
      };

      const ext = file.name.split('.').pop() ?? 'jpg';
      const fileName = `${Date.now()}.${ext}`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('publicKey', auth.publicKey);
      formData.append('token', auth.token);
      formData.append('expire', auth.expire);
      formData.append('signature', auth.signature);

      const response = await fetch(
        'https://upload.imagekit.io/api/v1/files/upload',
        { method: 'POST', body: formData }
      );

      const result = (await response.json()) as { url: string };

      onChange(result.url);
      setPreview(result.url);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className='space-y-2'>
      {label && <p className='text-sm font-medium text-text-dark'>{label}</p>}

      <div
        className={cn(
          'relative rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-surface-soft',
          preview
            ? 'h-48'
            : 'h-36 cursor-pointer hover:border-teal/50 transition-colors'
        )}
        onClick={() => !preview && inputRef.current?.click()}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt='Uploaded image'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Button
                size='sm'
                className='bg-white text-text-dark hover:bg-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Replace
              </Button>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center h-full gap-2 text-text-mid'>
            <UploadCloud className='size-8 text-teal/40' />
            <p className='text-xs'>Click or drag to upload</p>
          </div>
        )}

        {uploading && (
          <div className='absolute inset-0 bg-white/80 flex items-center justify-center'>
            <Loader2 className='size-6 text-teal animate-spin' />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
    </div>
  );
}
