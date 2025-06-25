export enum Category {
  historical = 'المعالم الأثرية',
  museums = 'المتاحف',
  parks = 'الحدائق',
  restaurants = 'المطاعم',
  hotels = 'الفنادق',
  malls = 'مراكز التسوق',
  beaches = 'الشواطئ',
  mosques = 'المساجد',
  cafes = 'المقاهي',
  traditionalMarkets = 'الأسواق التقليدية',
  naturalview = 'مناظر طبيعية',
  resorts = 'المنتجعات السياحية ',
  all = 'كل الفئات',
}
export enum City {
  tripoli = 'طرابلس',
  benghazi = 'بنغازي',
  misrata = 'مصراتة',
  sabratha = 'صبراتة',
  sirte = 'سرت',
  zliten = 'زليتن',
  khoms = 'الخمس',
  derna = 'درنة',
  tobruk = 'طبرق',
  ghat = 'غات',
  all = 'ليبيا',
}
export type Place = {
  id: string;
  isFavorite: boolean;
  createdAt: string;
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  city: string;
  type: Category;
};
