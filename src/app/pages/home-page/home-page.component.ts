import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/site/card.component';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../ui/carousel/carousel.component';
import { Category, Place } from '../../../types/model';
import { SitesService } from '../sites.service';

@Component({
  imports: [RouterLink, CardComponent, CarouselComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private sitesSerice = inject(SitesService);
  constructor() {}
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
}
