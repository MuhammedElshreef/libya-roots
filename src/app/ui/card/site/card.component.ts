import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Place } from '../../../../types/model';
import { SlicePipe } from '@angular/common';
import { PlacesService } from '../../../pages/places.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule, SlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input({ required: true }) item!: Place;

  private router = inject(Router);
  private placesService = inject(PlacesService);

  navigateToSite() {
    this.router.navigate(['/places', this.item.id]);
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.placesService.toggleFavorite(this.item.id);
  }
}
