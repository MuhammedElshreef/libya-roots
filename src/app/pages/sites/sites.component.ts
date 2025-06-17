import { Component } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites',
  imports: [CardComponent],
  templateUrl: './sites.component.html',
  styles: ``,
})
export class SitesComponent {
  category: string = 'all';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params['q'] || 'all';
    });
  }
  onCategoryChange(newCategory: string): void {
    this.router.navigate([], {
      queryParams: { q: newCategory },
      queryParamsHandling: 'merge',
    });
  }
  onCategoryChangeEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onCategoryChange(value);
  }

  getTitle(): string {
    if (this.category === 'all') return 'إكتشف أهم المواقع';
    return `إكتشف أهم ${this.getCategoryLabel(this.category)} في ليبيا`;
  }

  getSubtitle(): string | null {
    return this.category === 'all'
      ? 'إكتشف أهم المواقع السياحية في ليبيا، من الآثار القديمة إلى المطاعم.'
      : null;
  }

  getCategoryLabel(key: string): string {
    const labels: Record<string, string> = {
      historical: 'المعالم الأثرية',
      resorts: 'المنتجعات السياحية',
      museums: 'المتاحف',
      parks: 'الحدائق',
      restaurants: 'المطاعم',
      hotels: 'الفنادق',
      malls: 'مراكز التسوق',
      beaches: 'الشواطئ',
      mosques: 'المساجد',
      cafes: 'المقاهي',
      'traditional-markets': 'الأسواق التقليدية',
      all: 'كل الفئات',
    };
    return labels[key] || '';
  }
}
