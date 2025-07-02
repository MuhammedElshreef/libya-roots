import {
  computed,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import places from '../../places.json';
import { Category, Place } from '../../types/model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly _places = signal<Place[]>([]);
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private readonly categoryMap: Record<string, Category> = {
    'معلم أثري': Category.historical,
    'معلم بارز': Category.landmarks,
    متحف: Category.museums,
    حديقة: Category.parks,
    مطعم: Category.restaurants,
    فندق: Category.hotels,
    'مركز تسوق': Category.malls,
    شاطئ: Category.beaches,
    مسجد: Category.mosques,
    مقهى: Category.cafes,
    'سوق تقليدي': Category.traditionalMarkets,
    'منظر طبيعي': Category.naturalview,
    'منتجع سياحي': Category.resorts,
    'مكان تاريخي': Category.historicalPlaces,
    'كل الفئات': Category.all,
  };

  private init(): void {
    if (!this.initialized) {
      const favorites = this.loadFavorites();
      const loadedPlaces = places.map((place) => ({
        ...place,
        type: this.mapToCategory(place.type ?? 'all'),
        isFavorite: favorites.includes(place.id),
      }));
      this._places.set(loadedPlaces);
      this.initialized = true;
    }
  }

  get places(): Place[] {
    return this._places();
  }

  readonly favoritePlaces = computed(() =>
    this._places().filter((place) => place.isFavorite)
  );

  toggleFavorite(id: string): void {
    const updated = this._places().map((p) =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    this._places.set(updated);

    const changed = updated.find((p) => p.id === id);
    if (changed) {
      this.updateFavoritesLocalStorage(id, changed.isFavorite);
    }
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

  private updateFavoritesLocalStorage(
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
