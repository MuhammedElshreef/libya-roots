import { Component, computed, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { PlacesService } from '../places.service';

@Component({
  imports: [RouterLink, CardComponent, CarouselComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private placesService = inject(PlacesService);
  places = computed(() => {
    return this.placesService.places.slice(0, 8);
  });
}
