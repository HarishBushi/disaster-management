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
    location: { type: 'Point', coordinates: [0, 0] },
    capacity: 0,
  };

  shelters: any[] = [];
  editMode = false;
  shelterToEditId: string | null = null;

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
      location: { type: 'Point', coordinates: [...shelter.location.coordinates] },
      capacity: shelter.capacity,
    };
  }

  updateShelter(): void {
    if (!this.shelterToEditId) return;

    this.shelterService.updateShelter(this.shelterToEditId, this.newShelter).subscribe(() => {
      this.fetchShelters(); // Refresh list after update
      this.resetForm();
    });
  }

  deleteShelter(id: string): void {
    this.shelterService.deleteShelter(id).subscribe(() => {
      this.shelters = this.shelters.filter(s => s._id !== id);
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.newShelter = {
      name: '',
      address: '',
      location: { type: 'Point', coordinates: [0, 0] },
      capacity: 0,
    };
    this.editMode = false;
    this.shelterToEditId = null;
  }
}
