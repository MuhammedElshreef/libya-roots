// favorites-page.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { PlacesService } from '../places.service';
import { Place } from '../../../types/model';

@Component({
  selector: 'app-favorites-page',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './favorites-page.component.html',
})
export class FavoritesPageComponent {
  private PlacesService = inject(PlacesService);
  private allPlaces = signal<Place[]>(this.PlacesService.places);
  constructor() {
    console.log('faverites-page.component.ts initialized', this.allPlaces());
  }

  favoritePlaces = computed(() => {
    return this.allPlaces().filter((place) => place.isFavorite);
  });

  getTitle(): string {
    return 'مواقعك المفضلة';
  }

  getSubtitle(): string | null {
    return 'استعرض الأماكن التي قمت بإضافتها إلى المفضلة.';
  }
}
