import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category, Place } from '../../../types/model';

@Component({
  selector: 'app-places',
  imports: [CardComponent],
  templateUrl: './places.component.html',
  styles: ``,
})
export class PlacesComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  category = signal<keyof typeof Category | 'all'>('all');
  city = signal<string | null>('all');

  items = signal<Place[]>([
    {
      id: '92bb9fb7-2306-40f5-aa88-5ee53949c32a',
      isFavorite: false,
      createdAt: '2025-06-15T20:18:40.843Z',
      name: 'Leptis Magna',
      latitude: 32.632272,
      longitude: 14.309528,
      image: 'Remains-amphitheatre-Roman-Libya-Leptis-Magna.webp',
      description:
        'Leptis Magna, located in modern-day Libya, was one of the most prominent cities of the Roman Empire. Founded by the Phoenicians, it flourished under Roman rule, especially during the reign of Emperor Septimius Severus, who was born there. The city is renowned for its well-preserved ruins, including a theater, basilica, and triumphal arch. Its strategic location on the Mediterranean coast made it a vital trade hub. Today, Leptis Magna is a UNESCO World Heritage Site, celebrated for its stunning architecture and historical significance.',
      city: 'الخمس',
      type: Category.historical,
    },
    {
      id: '1',
      isFavorite: false,
      createdAt: '2025-06-15T20:18:40.843Z',
      name: 'مسجد الدعوة الإسلامية',
      latitude: 32.632272,
      longitude: 14.309528,
      image: 'mosque.webp',
      description:
        'مسجد الدعوة الإسلامية هو أحد المساجد البارزة في مدينة طرابلس، يتميز بتصميمه المعماري الجميل وأجوائه الروحانية.',
      city: 'طرابلس',
      type: Category.mosques,
    },
    {
      id: '2',
      isFavorite: false,
      createdAt: '2025-06-15T20:18:40.843Z',
      name: 'منتجع شاطئ النخيل',
      latitude: 32.632272,
      longitude: 14.309528,
      image: 'cat-resort.jpg',
      description:
        'منتجع شاطئ النخيل هو وجهة سياحية رائعة تقع على الساحل الليبي، يقدم خدمات فاخرة وإطلالات خلابة على البحر.',
      city: 'طرابلس',
      type: Category.resorts,
    },
    {
      id: '3',
      isFavorite: false,
      createdAt: '2025-06-15T20:18:40.843Z',
      name: 'متحف السرايا الحمراء',
      latitude: 32.632272,
      longitude: 14.309528,
      image: 'cat-museum.jpg',
      description:
        'متحف السرايا الحمراء هو متحف تاريخي يضم مجموعة من القطع الأثرية التي تعكس تاريخ وثقافة ليبيا.',
      city: 'طرابلس',
      type: Category.museums,
    },
    {
      id: '4',
      isFavorite: false,
      createdAt: '2025-06-15T20:18:40.843Z',
      name: 'حديقة الشهداء',
      latitude: 32.632272,
      longitude: 14.309528,
      image: 'cat-park.png',
      description:
        'حديقة الشهداء هي واحدة من أكبر الحدائق في طرابلس، توفر مساحات خضراء واسعة ومرافق ترفيهية.',
      city: 'طرابلس',
      type: Category.parks,
    },
  ]);
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
