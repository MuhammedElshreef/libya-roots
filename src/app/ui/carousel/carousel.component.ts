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
      image: 'assets/categories/cat-ancient.webp',
    },
    {
      title: 'منتجعات سياحية',
      category: 'resorts',
      image: 'assets/categories/cat-resort.webp',
    },
    {
      title: 'متاحف',
      category: 'museums',
      image: 'assets/categories/cat-museum.webp',
    },
    {
      title: 'حدائق',
      category: 'parks',
      image: 'assets/categories/cat-park.webp',
    },
    {
      title: 'مطاعم',
      category: 'restaurants',
      image: 'assets/categories/cat-restaurant.webp',
    },
    {
      title: 'فنادق',
      category: 'hotels',
      image: 'assets/categories/cat-hotel1.webp',
    },
    {
      title: 'مراكز تسوق',
      category: 'malls',
      image: 'assets/categories/cat-mall.webp',
    },
    {
      title: 'شواطئ',
      category: 'beaches',
      image: 'assets/categories/cat-beach.webp',
    },
    {
      title: 'مساجد',
      category: 'mosques',
      image: 'assets/categories/cat-mosques.webp',
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
      image: 'assets/categories/cat-cafe1.webp',
    },
    {
      title: 'اسواق تقليدية',
      category: 'traditional-markets',
      image: 'assets/categories/cat-traditionalmarket.webp',
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
    this.scrollContainer.nativeElement.addEventListener('touchmove', () => {}, {
      passive: false,
    });
  }

  startDrag(event: TouchEvent | MouseEvent): void {
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

    if (event instanceof TouchEvent) {
      event.preventDefault(); // ← only here, during actual dragging
    }

    this.scrollContainer.nativeElement.scrollLeft = this.scrollStart - delta;
  }

  endDrag(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.scrollContainer.nativeElement.classList.remove('dragging');

    if (this.dragDistance < 5) {
      return;
    }

    // Prevent click navigation if dragged
    const links = this.scrollContainer.nativeElement.querySelectorAll('a');
    links.forEach((link: HTMLAnchorElement) =>
      link.addEventListener('click', (e) => e.preventDefault(), { once: true })
    );

    this.applyMomentum(this.velocity * 100);
    this.dragDistance = 0;
  }

  private applyMomentum(initialVelocity: number) {
    const friction = 0.93; // 🧽 Less friction = longer momentum
    const stopThreshold = 0.5; // ⛔ Stop when velocity is small
    let velocity = Math.max(Math.min(initialVelocity * 2, 100), -100); // 💨 Boost velocity

    const container = this.scrollContainer.nativeElement;

    const step = () => {
      if (Math.abs(velocity) < stopThreshold) return;

      container.scrollLeft += velocity; // ← Use += not -= for correct direction
      velocity *= friction; // Gradually reduce speed

      this.animationFrame = requestAnimationFrame(step);
    };

    step();
  }
  // private applyMomentum(initialVelocity: number) {
  //   const friction = 0.95;
  //   const stopThreshold = 0.05;
  //   let velocity = initialVelocity;

  //   const container = this.scrollContainer.nativeElement;

  //   const step = () => {
  //     if (Math.abs(velocity) < stopThreshold) return;

  //     container.scrollLeft -= velocity; // ← Use += not -= for correct direction
  //     velocity *= friction; // Gradually reduce speed

  //     this.animationFrame = requestAnimationFrame(step);
  //   };

  //   step();
  // }
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
