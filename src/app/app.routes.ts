import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'places',
    loadComponent: () =>
      import('./pages/places/places.component').then((m) => m.PlacesComponent),
  },
  {
    path: 'places/:id',
    loadComponent: () =>
      import('./pages/places/place-details/place-details.component').then(
        (m) => m.PlaceDetailsComponent
      ),
  },
];
