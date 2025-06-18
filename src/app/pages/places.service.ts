import { Injectable } from '@angular/core';
import places from '../../places.json';
import { Category, Place } from '../../types/model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = places.map((place) => ({
    ...place,
    type: this.mapCategory(place.type),
  }));

  get places(): Place[] {
    return this._places;
  }

  private mapCategory(type: string): Category {
    const entry = Object.entries(Category).find(([, label]) => label === type);
    return entry ? (entry[1] as Category) : Category.all;
  }
}
