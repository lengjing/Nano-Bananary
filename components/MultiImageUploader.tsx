import React, { useCallback, useState } from 'react';
import type { ImageFile } from '../types';

interface MultiImageUploaderProps {
  onImagesSelect: (images: ImageFile[]) => void;
  images: ImageFile[];
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
  t: any;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  onImagesSelect,
  images,
  onRemoveImage,
  onClearAll,
  t
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((files: FileList) => {
    const newImages: ImageFile[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          newImages.push({
            file,
            dataUrl,
            id: `${Date.now()}-${Math.random()}`
          });
          
          if (newImages.length === files.length) {
            onImagesSelect([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [images, onImagesSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-orange-500 bg-orange-500/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          id="multi-image-upload"
        />
        <label htmlFor="multi-image-upload" className="cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm text-gray-400">
            {t.transformations.clickToUpload}
          </p>
          <p className="text-xs text-gray-500">{t.transformations.fileFormat}</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{images.length} {t.transformations.imagesSelected}</span>
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              {t.transformations.clearAll}
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.dataUrl}
                  alt="Upload preview"
                  className="w-full h-20 object-cover rounded-lg border border-gray-600"
                />
                <button
                  onClick={() => onRemoveImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;