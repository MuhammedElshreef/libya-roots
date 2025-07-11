import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {} from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, City } from '../../../types/model';
import { PlacesService } from '../places.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CardComponent],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
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

  cities = signal([
    { value: 'all', label: 'الكل' },
    { value: 'tripoli', label: 'طرابلس' },
    { value: 'misrata', label: 'مصراتة' },
    { value: 'zliten', label: 'زليتن' },
    { value: 'sirte', label: 'سرت' },
    { value: 'baniWalid', label: 'بني وليد' },
    { value: 'tarhuna', label: 'ترهونة' },
    { value: 'alKhums', label: 'الخمس' },
    { value: 'sabratha', label: 'صبراتة' },
    { vlaue: 'mizda', label: 'مزدة' },
    // { value: 'tajoura', label: 'تاجوراء' },
    { value: 'alQarabulli', label: 'القره بوللي' },
    { value: 'wadiWishka', label: 'الوشكه' },
    { value: 'waddan', label: 'ودان' },
    { value: 'sokna', label: 'سوكنة' },
    { value: 'zella', label: 'زله' },
    { value: 'hun', label: 'هون' },
    { value: 'sabha', label: 'سبها' },
    { value: 'gat', label: 'غات' },
    { value: 'ubari', label: 'أوباري' },
    { value: 'germa', label: 'جرمة' },
    { value: 'alqatrun', label: 'القطرون' },
    { value: 'marzuq', label: 'مرزق' },
    { value: 'tsawa', label: 'تساوة' },
    { value: 'alawinat', label: 'العوينات' },
    { value: 'tobruk', label: 'طبرق' },
    { value: 'brega', label: 'برقة' },
    { value: 'shahat', label: 'شحات' },
    { value: 'apollonia', label: 'أبولونيا ( سوسة )' },
    { value: 'derna', label: 'درنة' },
    { value: 'benghazi', label: 'بنغازي' },
    { value: 'albayda', label: 'البيضاء' },
    { value: 'rebiana', label: 'ربيانة' },
    { value: 'aljaghbub', label: 'الجغبوب' },
    { value: 'alkufrah', label: 'الكفرة' },
    { value: 'tazirbu', label: 'تازربو' },
    { value: 'jalo', label: 'جالو' },
    { value: 'awjila', label: 'أوجلة' },
    { value: 'sariyr', label: 'سرير' },
  ]);

  categories = signal([
    { value: 'all', label: 'الكل' },
    { value: 'historical', label: 'معالم أثرية' },
    { value: 'naturalview', label: 'مناظر طبيعية' },
    { value: 'historicalPlaces', label: 'الأماكن التاريخية' },
    { value: 'landmarks', label: 'المعالم البارزة' },
    { value: 'beaches', label: 'شواطئ' },
    { value: 'parks', label: 'حدائق' },
    { value: 'hotels', label: 'فنادق' },
    { value: 'resorts', label: 'منتجعات سياحية' },
    { value: 'mosques', label: 'مساجد' },
    // { value: 'churches', label: 'كنيسة' },
    { value: 'malls', label: 'مراكز تسوق' },
    { value: 'traditionalMarkets', label: 'اسواق تقليدية' },
    { value: 'restaurants', label: 'مطاعم' },
    { value: 'museums', label: 'متاحف' },
    { value: 'cafes', label: 'مقاهي' },
    // { value: 'old-town', label: 'منطقة تاريخية' },
  ]);
  filteredItems = computed(() => {
    return this.items().filter((item) => {
      const matchesCategory =
        this.category() === 'all' ||
        item.type === Category[this.category() as keyof typeof Category];

      const matchesCity =
        this.city() === 'all' ||
        item.city.trim() === City[this.city() as keyof typeof City];

      return matchesCategory && matchesCity;
    });
  });

  ngOnInit(): void {
    const subscription = this.route.queryParams.subscribe((params) => {
      this.category.set((params['cat'] as keyof typeof Category) || 'all');
      this.city.set((params['city'] as keyof typeof City) || 'all');
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onCategoryChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      | keyof typeof Category
      | 'all';
    this.router.navigate([], {
      queryParams: { cat: value },
      queryParamsHandling: 'merge',
    });
  }

  onCityChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      | keyof typeof City
      | 'all';
    this.router.navigate([], {
      queryParams: { city: value },
      queryParamsHandling: 'merge',
    });
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
