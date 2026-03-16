'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types';

interface GalleryGridProps {
  initialData: GalleryImage[];
}

export function GalleryGrid({ initialData }: GalleryGridProps) {
  const categories = [
    'All',
    ...Array.from(new Set(initialData.map((img) => img.room)))
  ];
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filtered =
    activeFilter === 'All'
      ? initialData
      : initialData.filter((img) => img.room === activeFilter);

  return (
    <>
      {/* Filter Tabs */}
      <div className='flex flex-wrap gap-2 justify-center mb-8'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeFilter === cat
                ? 'bg-teal text-white shadow-card'
                : 'bg-white text-text-mid border border-gray-200 hover:border-teal hover:text-teal'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filtered.map((image) => (
          <button
            key={image.id}
            onClick={() => setLightboxImage(image)}
            className='group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none'
            aria-label={`View larger: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover group-hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-text-dark/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
              <p className='text-white text-sm font-medium'>{image.room}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightboxImage}
        onOpenChange={(open) => {
          if (!open) setLightboxImage(null);
        }}
      >
        <DialogContent className='max-w-4xl w-full p-0 overflow-hidden bg-text-dark border-0'>
          <DialogTitle className='sr-only'>
            {lightboxImage?.alt ?? 'Gallery image'}
          </DialogTitle>
          <button
            onClick={() => setLightboxImage(null)}
            className='absolute right-3 top-3 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors'
            aria-label='Close lightbox'
          >
            <X className='h-4 w-4' />
          </button>
          {lightboxImage && (
            <div className='relative aspect-[4/3] w-full'>
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes='(max-width: 1024px) 100vw, 900px'
                className='object-cover'
                priority
              />
              <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-text-dark/70 to-transparent p-6'>
                <p className='text-white text-sm font-medium'>
                  {lightboxImage.room}
                </p>
                <p className='text-white/70 text-xs mt-1'>
                  {lightboxImage.alt}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
