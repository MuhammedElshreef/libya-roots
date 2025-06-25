// edit المعالم الاثرية
// <option value="المعالم البارزة">معالم بارزة</option>

export enum Category {
  historical = 'المعالم الأثرية',
  landmarks = 'المعالم البارزة',
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
  resorts = 'المنتجعات السياحية',
  historicalPlaces = 'الأماكن التاريخية',
  all = 'كل الفئات',
}

export enum City {
  tripoli = 'طرابلس',
  misrata = 'مصراتة',
  zliten = 'زليتن',
  sirte = 'سرت',
  baniWalid = 'بني وليد',
  tarhuna = 'ترهونة',
  alKhums = 'الخمس',
  sabratha = 'صبراتة',
  tajoura = 'تاجوراء',
  alQarabulli = 'القره بوللي',
  wadiWishka = 'الوشكه',
  waddan = 'ودان',
  sokna = 'سوكنة',
  zella = 'زله',
  hun = 'هون',
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
