import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import places from '../../places.json';
import { Category, Place } from '../../types/model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [];
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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

  init(): void {
    if (!this.initialized && isPlatformBrowser(this.platformId)) {
      const favorites = this.loadFavorites();
      this._places = places.map((place) => ({
        ...place,
        type: this.mapToCategory(place.type),
        isFavorite: favorites.includes(place.id),
      }));
      this.initialized = true;
    }
  }

  get places(): Place[] {
    if (!this.initialized) {
      // fallback if init wasn't called explicitly, do a minimal init on first access in browser
      if (isPlatformBrowser(this.platformId)) {
        this.init();
      } else {
        // If server, just return empty array or static data without favorites
        this._places = places.map((place) => ({
          ...place,
          type: this.mapToCategory(place.type),
          isFavorite: false,
        }));
        this.initialized = true;
      }
    }
    return this._places;
  }

  toggleFavorite(id: string): void {
    const place = this._places.find((p) => p.id === id);
    if (!place) return;

    place.isFavorite = !place.isFavorite;

    this.updateFavoritesLoaclStorage(place.id, place.isFavorite);
  }

  private loadFavorites(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const favString = localStorage.getItem('favoritePlaces');
      if (favString) {
        try {
          return JSON.parse(favString);
        } catch {
          return [];
        }
      }
    }
    return [];
  }

  private updateFavoritesLoaclStorage(
    placeId: string,
    isFavorite: boolean
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const currentFavorites = this.loadFavorites();

    let updatedFavorites: string[];

    if (isFavorite) {
      if (!currentFavorites.includes(placeId)) {
        updatedFavorites = [...currentFavorites, placeId];
      } else {
        updatedFavorites = currentFavorites;
      }
    } else {
      updatedFavorites = currentFavorites.filter((id) => id !== placeId);
    }

    localStorage.setItem('favoritePlaces', JSON.stringify(updatedFavorites));
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
