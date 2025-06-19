import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, City } from '../../../types/model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './places.component.html',
})
export class PlacesComponent {
  private placesService = inject(PlacesService);
  private items = computed(() => this.placesService.places);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  category = signal<keyof typeof Category | 'all'>('all');
  city = signal<keyof typeof City | 'all'>('all');

  filteredItems = computed(() => {
    return this.items().filter((item) => {
      const matchesCategory =
        this.category() === 'all' ||
        item.type === Category[this.category() as keyof typeof Category];

      const matchesCity =
        this.city() === 'all' ||
        item.city === City[this.city() as keyof typeof City];

      return matchesCategory && matchesCity;
    });
  });

  ngOnInit(): void {
    const subscription = this.route.queryParams.subscribe((params) => {
      this.category.set((params['q'] as keyof typeof Category) || 'all');
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onCategoryChange(newCategory: keyof typeof Category | 'all'): void {
    this.router.navigate([], {
      queryParams: { q: newCategory },
      queryParamsHandling: 'merge',
    });
  }

  onCategoryChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      | keyof typeof Category
      | 'all';
    this.onCategoryChange(value);
  }

  onCityChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      | keyof typeof City
      | 'all';
    this.city.set(value);
  }

  getTitle(): string {
    const cat = this.category();
    const city = this.city();

    const categoryLabel =
      cat === 'all' ? 'المواقع' : this.getCategoryLabel(cat);
    const cityLabel = city === 'all' ? City.all : this.getCityLabel(city);

    return `إكتشف أهم ${categoryLabel} في ${cityLabel}`;
  }

  getSubtitle(): string | null {
    const city = this.city();
    return this.category() === 'all'
      ? `إكتشف أهم المواقع السياحية في ${this.getCityLabel(
          city
        )}، من الآثار القديمة إلى المطاعم.`
      : null;
  }

  getCategoryLabel(key: keyof typeof Category): string {
    return Category[key];
  }

  getCityLabel(key: keyof typeof City): string {
    return City[key];
  }
}
