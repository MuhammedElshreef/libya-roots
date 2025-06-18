import { Component, inject, OnInit, signal } from '@angular/core';
import { Place } from '../../../../types/model';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-place-details',
  imports: [],
  templateUrl: './place-details.component.html',
  styles: ``,
})
export class PlaceDetailsComponent implements OnInit {
  private PlaceService = inject(PlaceService);
  private router = inject(ActivatedRoute);

  item = signal<Place | null>(null);
  id = signal<string | null>(null);

  ngOnInit() {
    this.id.set(this.router.snapshot.paramMap.get('id'));
    if (this.id()) {
      this.item.set(this.PlaceService.getPlaceById(this.id()!) ?? null);
    }
  }
}
