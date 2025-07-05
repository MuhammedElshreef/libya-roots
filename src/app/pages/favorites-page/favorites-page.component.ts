import { Component, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { PlacesService } from '../places.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CardComponent],
  animations: [
    trigger('fadeInUp', [
      transition(':enter, void => visible', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
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
