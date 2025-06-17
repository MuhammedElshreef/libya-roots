import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [RouterLink, MatIcon],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  items = [
    {
      title: 'معالم أثرية',
      category: 'historical',
      image: 'assets/cat-ancient.jpeg',
    },
    {
      title: 'منتجعات سياحية',
      category: 'resorts',
      image: 'assets/cat-resort.jpg',
    },
    {
      title: 'متاحف',
      category: 'museums',
      image: 'assets/cat-museum.jpg',
    },
    {
      title: 'حدائق',
      category: 'parks',
      image: 'assets/cat-park.png',
    },
    {
      title: 'مطاعم',
      category: 'restaurants',
      image: 'assets/cat-restaurant.jpg',
    },
    {
      title: 'فنادق',
      category: 'hotels',
      image: 'assets/cat-hotel1.jpeg',
    },
    {
      title: 'مراكز تسوق',
      category: 'malls',
      image: 'assets/cat-mall.jpg',
    },
    {
      title: 'شواطئ',
      category: 'beaches',
      image: 'assets/cat-beach.png',
    },
    {
      title: 'مساجد',
      category: 'mosques',
      image: 'assets/mosque.webp',
    },
    // {
    //   title: 'كنيسة',
    //   category: 'church',
    //   image: 'assets/cat-church.jpeg',
    // },
    // {
    //   title: 'منطقة تاريخية',
    //   category: 'old-town',
    //   image: 'assets/cat-historical.jpeg',
    // },
    {
      title: 'مقاهي',
      category: 'cafes',
      image: 'assets/cat-cafe1.png',
    },
    {
      title: 'اسواق تقليدية',
      category: 'traditional-markets',
      image: 'assets/cat-traditionalmarket.jpg',
    },
  ];

  private isDragging = false;
  private startX = 0;
  private scrollStart = 0;
  private lastX = 0;
  private velocity = 0;
  private lastMoveTime = 0;
  private dragDistance = 0;
  private animationFrame: number | null = null;

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener(
      'touchstart',
      () => {},
      {
        passive: false,
      }
    );
  }

  startDrag(event: TouchEvent | MouseEvent): void {
    if (!(event instanceof TouchEvent)) return; // فقط على اللمس

    this.isDragging = true;
    this.startX = this.getPageX(event);
    this.scrollStart = this.scrollContainer.nativeElement.scrollLeft;
    this.lastX = this.startX;
    this.lastMoveTime = performance.now();
    this.dragDistance = 0;

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.scrollContainer.nativeElement.classList.add('dragging');
  }

  onDrag(event: TouchEvent | MouseEvent): void {
    if (!(event instanceof TouchEvent)) return;
    if (!this.isDragging) return;

    const currentX = this.getPageX(event);
    const delta = currentX - this.startX;
    this.dragDistance = Math.abs(delta);

    const now = performance.now();
    const deltaTime = now - this.lastMoveTime;

    if (deltaTime > 0) {
      this.velocity = (currentX - this.lastX) / deltaTime;
      this.lastX = currentX;
      this.lastMoveTime = now;
    }

    this.scrollContainer.nativeElement.scrollLeft = this.scrollStart - delta;
  }

  endDrag(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.scrollContainer.nativeElement.classList.remove('dragging');

    if (this.dragDistance < 5) {
      // نقرة، دع الرابط يعمل
      return;
    }

    this.applyMomentum(this.velocity * 100);
    this.dragDistance = 0;
  }

  private applyMomentum(initialVelocity: number) {
    const friction = 0.95;
    const stopThreshold = 0.05;
    let velocity = initialVelocity;

    const container = this.scrollContainer.nativeElement;

    const step = () => {
      if (Math.abs(velocity) < stopThreshold) return;

      container.scrollLeft -= velocity;
      velocity *= friction;

      this.animationFrame = requestAnimationFrame(step);
    };

    step();
  }

  private getPageX(event: TouchEvent | MouseEvent): number {
    return event instanceof TouchEvent
      ? event.touches[0]?.pageX ?? 0
      : event.pageX;
  }

  scrollLeft(): void {
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
  }

  scrollRight(): void {
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
  }

  get totalPages(): number {
    const container = this.scrollContainer.nativeElement;
    return Math.ceil(container.scrollWidth / container.offsetWidth);
  }

  getCurrentPage(): number {
    const container = this.scrollContainer.nativeElement;
    return Math.floor(container.scrollLeft / container.offsetWidth) + 1;
  }
}
