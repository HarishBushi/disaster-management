import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShelterService } from '../services/shelter.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css'],
})
export class SheltersComponent implements OnInit {
  newShelter = {
    name: '',
    address: '',
    location: '',
    capacity: 0,
    latitude: 0,
    longitude: 0,
  };

  shelters: any[] = [];
  editMode = false;
  shelterToEditId: string | null = null;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 28.6139, lng: 77.209 }, // Default center (New Delhi)
    zoom: 8,
  };

  markerPosition: google.maps.LatLngLiteral | null = null;

  constructor(private shelterService: ShelterService, private router: Router) {}

  ngOnInit(): void {
    this.fetchShelters();
  }

  fetchShelters(): void {
    this.shelterService.getShelters().subscribe((data: any) => {
      this.shelters = data;
    });
  }

  createShelter(): void {
    this.shelterService.createShelter(this.newShelter).subscribe((shelter) => {
      this.shelters.push(shelter);
      this.resetForm();
      this.router.navigate(['/shelters']);
    });
  }

  editShelter(shelter: any): void {
    this.editMode = true;
    this.shelterToEditId = shelter._id;
    this.newShelter = {
      name: shelter.name,
      address: shelter.address,
      location: shelter.location,
      capacity: shelter.capacity,
      latitude: shelter.latitude,
      longitude: shelter.longitude,
    };
    this.markerPosition = {
      lat: shelter.latitude,
      lng: shelter.longitude,
    }; // Place marker on map for editing
  }

  updateShelter(): void {
    if (!this.shelterToEditId) return;

    this.shelterService
      .updateShelter(this.shelterToEditId, this.newShelter)
      .subscribe(() => {
        this.fetchShelters(); // Refresh list after update
        this.resetForm();
      });
  }

  deleteShelter(id: string): void {
    this.shelterService.deleteShelter(id).subscribe(() => {
      this.shelters = this.shelters.filter((s) => s._id !== id);
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const { lat, lng } = event.latLng.toJSON();
      this.newShelter.latitude = lat;
      this.newShelter.longitude = lng;
      this.markerPosition = { lat, lng };
    }
  }

  private resetForm(): void {
    this.newShelter = {
      name: '',
      address: '',
      location: '',
      capacity: 0,
      latitude: 0,
      longitude: 0,
    };
    this.editMode = false;
    this.shelterToEditId = null;
    this.markerPosition = null; // Reset marker
  }
}
