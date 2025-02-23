import { supabase } from '../lib/supabase';

export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/bungee`;

interface UploadImageProps {
  file: File;
  studioId: string;
  type: 'featured' | 'gallery' | 'thumbnail';
}

interface ImageTransformOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg';
  }

  export const getTransformedImageUrl = (path: string, options: ImageTransformOptions = {}) => {
    const baseUrl = getStudioImageUrl(path);
    const searchParams = new URLSearchParams();

    if (options.width) searchParams.set('width', options.width.toString());
    if (options.height) searchParams.set('height', options.height.toString());
    if (options.quality) searchParams.set('quality', options.quality.toString());
    if (options.format) searchParams.set('format', options.format);

    return `${baseUrl}?${searchParams.toString()}`;
  };

export const uploadStudioImage = async ({ file, studioId, type }: UploadImageProps) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${studioId}/${type}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('studio-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  return {
    url: `${STORAGE_URL}/${filePath}`,
    path: filePath
  };
};

export const deleteStudioImage = async (path: string) => {
  const { error } = await supabase.storage
    .from('studio-images')
    .remove([path]);

  if (error) throw error;
};

export const getStudioImageUrl = (path: string) => {
  return `${STORAGE_URL}/${path}`;
};


export const getImageUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from('bungee')
      .getPublicUrl(path);

    return data.publicUrl;
  };