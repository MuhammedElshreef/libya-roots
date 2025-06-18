import { Injectable } from '@angular/core';
import places from '../../places.json';
import { Category, Place } from '../../types/model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly categoryMap: Record<string, Category> = {
    'معلم أثري': Category.historical,
    مسجد: Category.mosques,
    منتجع: Category.resorts,
    متحف: Category.museums,
    حديقة: Category.parks,
    مطعم: Category.restaurants,
    فندق: Category.hotels,
    'مركز تسوق': Category.malls,
    شاطئ: Category.beaches,
    مقهى: Category.cafes,
    'سوق تقليدي': Category.traditionalMarkets,
  };

  private _places: Place[] = places.map((place) => ({
    ...place,
    type: this.mapToCategory(place.type),
  }));

  get places(): Place[] {
    return this._places;
  }

  private mapToCategory(inputType: string): Category {
    if (Object.values(Category).includes(inputType as Category)) {
      return inputType as Category;
    }

    const mappedCategory = this.categoryMap[inputType];
    if (mappedCategory) {
      return mappedCategory;
    }

    console.warn(`Unmapped category: ${inputType}. Defaulting to 'all'`);
    return Category.all;
  }

  getCategoryDisplayName(category: Category): string {
    return category;
  }
}
