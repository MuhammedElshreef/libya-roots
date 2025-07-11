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
  all = 'ليبيا',
  tripoli = 'طرابلس',
  misrata = 'مصراتة',
  zliten = 'زليتن',
  sirte = 'سرت',
  baniWalid = 'بني وليد',
  tarhuna = 'ترهونة',
  alKhums = 'الخمس',
  sabratha = 'صبراتة',
  mizda = 'مزدة',
  tajoura = 'تاجوراء',
  alQarabulli = 'القره بوللي',
  wadiWishka = 'الوشكه',
  waddan = 'ودان',
  sokna = 'سوكنة',
  zella = 'زله',
  hun = 'هون',
  sabha = 'سبها',
  gat = 'غات',
  ubari = 'أوباري',
  germa = 'جرمة',
  alqatrun = 'القطرون',
  marzuq = 'مرزق',
  tsawa = 'تساوة',
  alawinat = 'العوينات',
  tobruk = 'طبرق',
  brega = 'برقة',
  shahat = 'شحات',
  apollonia = 'أبولونيا ( سوسة )',
  derna = 'درنة',
  benghazi = 'بنغازي',
  albayda = 'البيضاء',
  rebiana = 'ربيانة',
  aljaghbub = 'الجغبوب',
  alkufrah = 'الكفرة',
  tazirbu = 'تازربو',
  jalo = 'جالو',
  awjila = 'أوجلة',
  sariyr = 'سرير',
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
