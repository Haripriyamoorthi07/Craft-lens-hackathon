export interface ProductData {
  id?: number;
  titleEnglish: string;
  titleTamil: string;
  descriptionEnglish: string;
  descriptionTamil: string;
  category: string;
  artisanVoiceNoteText: string;
  languageCode: 'ta' | 'en' | 'bilingual';
  imageUrl: string;
  catalogueImageUrl?: string;
  material: string;
  dimensions: string;
  craftsmanshipDetails: string;
  origin: string;
  recommendedPrice: number;
  minPriceRange: number;
  maxPriceRange: number;
  artisanStatedPrice: number;
  coachScore: number;
  improvementsList: string[];
}

export interface BuyerObjection {
  questionEnglish: string;
  questionTamil: string;
  objectionType: string;
  suggestedAnswerEnglish: string;
  suggestedAnswerTamil: string;
}

export interface ComparableItem {
  id: number;
  productName: string;
  category: string;
  material: string;
  price: number;
  sourcePlatform: string;
  craftRegion: string;
}
