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
    path: 'sites',
    loadComponent: () =>
      import('./pages/sites/sites.component').then((m) => m.SitesComponent),
  },
  {
    path: 'sites/:id',
    loadComponent: () =>
      import('./pages/sites/site-details/site-details.component').then(
        (m) => m.SiteDetailsComponent
      ),
  },
];
