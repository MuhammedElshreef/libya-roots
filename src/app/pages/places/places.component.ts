import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category, Place } from '../../../types/model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-places',
  imports: [CardComponent],
  templateUrl: './places.component.html',
  styles: ``,
})
export class PlacesComponent {
  private PlacesService = inject(PlacesService);
  private items = signal<Place[]>(this.PlacesService.places);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  category = signal<keyof typeof Category | 'all'>('all');
  city = signal<string | null>('all');

  filteredItems = computed(() => {
    return this.items().filter((item) => {
      const matchesCategory =
        this.category() === 'all' ||
        item.type === Category[this.category() as keyof typeof Category];
      const matchesCity =
        this.city() === 'all' || item.city === this.city() || !this.city();
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

  getTitle(): string {
    if (this.category() === 'all') return 'إكتشف أهم المواقع';
    return `إكتشف أهم ${this.getCategoryLabel(this.category())} في ليبيا`;
  }

  getSubtitle(): string | null {
    return this.category() === 'all'
      ? 'إكتشف أهم المواقع السياحية في ليبيا، من الآثار القديمة إلى المطاعم.'
      : null;
  }

  getCategoryLabel(key: keyof typeof Category | 'all'): string {
    if (key === 'all') return 'كل الفئات';
    return Category[key];
  }

  onCityChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.city.set(value || null);
  }
}
