export enum Category {
  historical = 'المعالم الأثرية',
  resorts = 'المنتجعات السياحية',
  museums = 'المتاحف',
  parks = 'الحدائق',
  restaurants = 'المطاعم',
  hotels = 'الفنادق',
  malls = 'مراكز التسوق',
  beaches = 'الشواطئ',
  mosques = 'المساجد',
  cafes = 'المقاهي',
  traditionalMarkets = 'الأسواق التقليدية',
  all = 'كل الفئات',
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
