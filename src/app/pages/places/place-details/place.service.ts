import { Injectable } from '@angular/core';
import { PlacesService } from '../../places.service';
import { Place } from '../../../../types/model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private placesService: PlacesService) {}

  getPlaceById(id: string): Place | undefined {
    return this.placesService.places.find((place) => place.id === id);
  }
}
