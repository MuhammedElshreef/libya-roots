import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject (Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}
