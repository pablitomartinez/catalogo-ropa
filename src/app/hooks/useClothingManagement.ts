//hook personalizado para gestion

// src/hooks/useClothingManagement.ts
import { useState, useCallback } from 'react';
import { Clothing, ClothingFormData } from '../lib/types';

export const useClothingManagement = () => {
  const [clothing, setClothing] = useState<Clothing[]>([]);

  const addClothing = useCallback((newClothing: ClothingFormData) => {
    const clothingWithId: Clothing = {
      ...newClothing,
      id: Date.now().toString(), // Temporal ID generación
    };
    setClothing(prev => [...prev, clothingWithId]);
  }, []);

  const updateClothing = useCallback((updatedClothing: Clothing) => {
    setClothing(prev => 
      prev.map(item => 
        item.id === updatedClothing.id ? updatedClothing : item
      )
    );
  }, []);

  const deleteClothing = useCallback((id: string) => {
    setClothing(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateStock = useCallback((id: string, newStock: number) => {
    setClothing(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, stockQuantity: newStock, inStock: newStock > 0 } 
          : item
      )
    );
  }, []);

  return {
    clothing,
    addClothing,
    updateClothing,
    deleteClothing,
    updateStock,
  };
};