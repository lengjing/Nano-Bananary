import React, { useCallback, useState, useRef, useEffect } from 'react';
import type { ImageFile } from '../types';

interface MultiImageEditorProps {
  images: ImageFile[];
  onImagesSelect: (images: ImageFile[]) => void;
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
  onMaskChange: (maskDataUrl: string | null) => void;
  isMaskToolActive: boolean;
  t: any;
}

const MultiImageEditor: React.FC<MultiImageEditorProps> = ({
  images,
  onImagesSelect,
  onRemoveImage,
  onClearAll,
  onMaskChange,
  isMaskToolActive,
  t
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedImageForMask, setSelectedImageForMask] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [maskCanvas, setMaskCanvas] = useState<HTMLCanvasElement | null>(null);

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

  const handleImageClick = (imageId: string) => {
    if (isMaskToolActive) {
      setSelectedImageForMask(imageId);
    }
  };

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMaskToolActive || !selectedImageForMask) return;
    setIsDrawing(true);
    draw(e);
  }, [isMaskToolActive, selectedImageForMask]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !maskCanvas) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (maskCanvas.width / rect.width);
    const y = (e.clientY - rect.top) * (maskCanvas.height / rect.height);

    const ctx = maskCanvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Update display canvas
    const displayCtx = canvas.getContext('2d');
    if (displayCtx) {
      displayCtx.globalCompositeOperation = 'source-over';
      displayCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      displayCtx.beginPath();
      displayCtx.arc(e.clientX - rect.left, e.clientY - rect.top, 10, 0, 2 * Math.PI);
      displayCtx.fill();
    }
  }, [isDrawing, maskCanvas]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (maskCanvas) {
      const maskDataUrl = maskCanvas.toDataURL();
      onMaskChange(maskDataUrl);
    }
  }, [isDrawing, maskCanvas, onMaskChange]);

  const clearMask = () => {
    if (maskCanvas) {
      const ctx = maskCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      }
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    onMaskChange(null);
  };

  useEffect(() => {
    if (selectedImageForMask && !maskCanvas) {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setMaskCanvas(canvas);
    }
  }, [selectedImageForMask, maskCanvas]);

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
                <div 
                  className={`relative cursor-pointer ${
                    selectedImageForMask === image.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => handleImageClick(image.id)}
                >
                  <img
                    src={image.dataUrl}
                    alt="Upload preview"
                    className="w-full h-20 object-cover rounded-lg border border-gray-600"
                  />
                  {selectedImageForMask === image.id && (
                    <canvas
                      ref={canvasRef}
                      width={200}
                      height={80}
                      className="absolute top-0 left-0 w-full h-full rounded-lg cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      style={{ pointerEvents: isMaskToolActive ? 'auto' : 'none' }}
                    />
                  )}
                  {isMaskToolActive && selectedImageForMask === image.id && (
                    <div className="absolute top-1 left-1 text-xs bg-orange-500 text-black px-1 rounded">
                      Mask
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRemoveImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedImageForMask && (
            <div className="flex gap-2">
              <button
                onClick={clearMask}
                className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                Clear Mask
              </button>
              <button
                onClick={() => setSelectedImageForMask(null)}
                className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-black rounded transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiImageEditor;