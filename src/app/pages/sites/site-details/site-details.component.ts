import { Component, signal } from '@angular/core';
import { Category, Place } from '../../../../types/model';

@Component({
  selector: 'app-site-details',
  imports: [],
  templateUrl: './site-details.component.html',
  styles: ``,
})
export class SiteDetailsComponent {
  item = signal<Place>({
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
  });
}
