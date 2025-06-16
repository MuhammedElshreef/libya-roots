import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  items = [
    {
      title: 'مسجد الملك فيصل',
      description: 'معلم أثري تاريخي في الرياض',
      category: 'معلم أثري',
      imageUrl: 'assets/mosque.webp',
    },
    {
      title: 'منتجع البحر الأحمر',
      description: 'منتجع سياحي فاخر على ساحل البحر الأحمر',
      category: 'منتجع سياحي',
      imageUrl: 'assets/mosque.webp',
    },
    {
      title: 'متحف الفن الحديث',
      description: 'متحف يضم مجموعة من الأعمال الفنية المعاصرة',
      category: 'متحف',
      imageUrl: 'assets/mosque.webp',
    },
    {
      title: 'حديقة الملك عبدالله',
      description: 'حديقة عامة جميلة في وسط المدينة',
      category: 'حديقة',
      imageUrl: 'assets/mosque.webp',
    },
    {
      title: 'مطعم الأطباق الشرقية',
      description: 'مطعم يقدم أشهى الأطباق الشرقية التقليدية',
      category: 'مطعم',
      imageUrl: 'assets/mosque.webp',
    },
  ];

  private isDragging = false;
  private startX = 0;
  private scrollStart = 0;

  private lastX = 0;
  private velocity = 0;
  private lastMoveTime = 0;

  private animationFrame: number | null = null;

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener(
      'touchstart',
      () => {},
      { passive: false }
    );
  }

  startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startX = this.getPageX(event);
    this.scrollStart = this.scrollContainer.nativeElement.scrollLeft;
    this.lastX = this.startX;
    this.lastMoveTime = performance.now();

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.scrollContainer.nativeElement.classList.add('dragging');
    event.preventDefault();
  }

  onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = this.getPageX(event);
    const delta = currentX - this.startX;

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
    this.applyMomentum(this.velocity * 100); // scaled velocity
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

  private getPageX(event: MouseEvent | TouchEvent): number {
    return event instanceof TouchEvent
      ? event.touches[0]?.pageX ?? 0
      : event.pageX;
  }
}
