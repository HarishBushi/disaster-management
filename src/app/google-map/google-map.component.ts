import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent {
  @Output() coordinatesSelected = new EventEmitter<{ lat: number; lng: number }>();

  mapOptions: google.maps.MapOptions = {
    center: { lat: 28.6139, lng: 77.209 }, // Default to New Delhi
    zoom: 8,
  };

  markerPosition: google.maps.LatLngLiteral | null = null;

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const { lat, lng } = event.latLng.toJSON();
      this.markerPosition = { lat, lng };
      this.coordinatesSelected.emit({ lat, lng });
    }
  }
}
