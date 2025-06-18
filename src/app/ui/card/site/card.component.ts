import { Component, inject, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Place } from '../../../../types/model';
import { SlicePipe } from '@angular/common';
import { PlacesService } from '../../../pages/places.service';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, SlicePipe],
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent {
  item = model<Place>();
  private router = inject(Router);
  private placesService = inject(PlacesService);

  navigateToSite() {
    this.router.navigate(['/places', this.item()?.id]);
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    const place = this.item();
    if (!place) return;

    this.placesService.toggleFavorite(place.id);
  }
}
