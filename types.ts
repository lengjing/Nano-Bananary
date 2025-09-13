
export interface Transformation {
  title: string;
  prompt: string;
  emoji: string;
}

export interface GeneratedContent {
  imageUrl: string | null;
  text: string | null;
}

export type GenerationMode = 'text-to-image' | 'image-to-image' | 'multi-image-to-image';

export interface ImageFile {
  file: File;
  dataUrl: string;
  id: string;
}
