import { Component } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { RouterLink } from '@angular/router';
// import { CategoryCardComponent } from '../../ui/category-card/category-card.component';
import { CarouselComponent } from '../../ui/carousel/carousel.component';

@Component({
  imports: [RouterLink, CardComponent, CarouselComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {}
