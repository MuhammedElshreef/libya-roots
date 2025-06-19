import { Component, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favorites-page.component.html',
})
export class FavoritesPageComponent {
  private PlacesService = inject(PlacesService);
  favoritePlaces = this.PlacesService.favoritePlaces;

  getTitle(): string {
    return 'مواقعك المفضلة';
  }

  getSubtitle(): string | null {
    return 'استعرض الأماكن التي قمت بإضافتها إلى المفضلة.';
  }
}
