import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { Category, Place } from '../../../types/model';
import { PlacesService } from '../places.service';

@Component({
  imports: [RouterLink, CardComponent, CarouselComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private PlaceService = inject(PlacesService);
  //   (alias) type Place = {
  //     id: string;
  //     isFavorite: boolean;
  //     createdAt: string;
  //     name: string;
  //     latitude: number;
  //     longitude: number;
  //     image: string;
  //     description: string;
  //     city: string;
  //     type: Category;
  // }
  places = signal<Place[]>(this.PlaceService.places);
}
