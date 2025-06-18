import { Component, inject, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Place } from '../../../../types/model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, SlicePipe],
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent {
  item = model<Place>();
  private router = inject(Router);
  navigateToSite() {
    this.router.navigate(['/places', this.item()?.id]);
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from bubbling to the parent div
    // Your favorite toggle logic here
    // Example:
    // this.item.update(value => ({...value, isFavorite: !value.isFavorite}));
    console.log('Favorite toggled for item:', this.item()?.id);
  }
}
