//definicion de tipos
// src/lib/types.ts

export interface Clothing {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  stockQuantity: number;
  price: number;
  category: 'tops' | 'bottoms' | 'dresses' | 'accessories';
}

export interface ClothingFormData extends Omit<Clothing, 'id'> {
  id?: string;
}

export interface AuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}