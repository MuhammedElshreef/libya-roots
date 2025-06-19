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
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites-page/favorites-page.component').then(
        (m) => m.FavoritesPageComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then(
        (m) => m.AboutPageComponent
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq-page/faq-page.component').then(
        (m) => m.FaqPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
