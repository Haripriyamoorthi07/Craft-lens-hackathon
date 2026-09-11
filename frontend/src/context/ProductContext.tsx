import React, { createContext, useContext, useState } from 'react';
import type { ProductData } from '../types/product';

const defaultProduct: ProductData = {
  titleEnglish: '',
  titleTamil: '',
  descriptionEnglish: '',
  descriptionTamil: '',
  category: 'Craft Item',
  artisanVoiceNoteText: '',
  languageCode: 'ta',
  imageUrl: '',          // No default image – must be uploaded by artisan
  catalogueImageUrl: '', // Will be set after AI processing
  material: '',
  dimensions: '',
  craftsmanshipDetails: '',
  origin: '',
  recommendedPrice: 0,
  minPriceRange: 0,
  maxPriceRange: 0,
  artisanStatedPrice: 0,
  coachScore: 0,
  improvementsList: []
};

interface ProductContextType {
  product: ProductData;
  setProduct: React.Dispatch<React.SetStateAction<ProductData>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetProduct: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<ProductData>(defaultProduct);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const resetProduct = () => {
    setProduct(defaultProduct);
    setCurrentStep(1);
  };

  return (
    <ProductContext.Provider value={{ product, setProduct, currentStep, setCurrentStep, resetProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within ProductProvider');
  return context;
};
