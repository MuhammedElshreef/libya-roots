import { Component, computed, inject } from '@angular/core';

import { CardComponent } from '../../ui/card/site/card.component';
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { RouterLink } from '@angular/router';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CardComponent, CarouselComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private placesService = inject(PlacesService);
  places = computed(() => this.placesService.places.slice(0, 8));
}
