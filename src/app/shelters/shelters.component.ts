import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
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

  constructor(private shelterService: ShelterService, private router: Router) {} // Inject Router

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
      this.newShelter = {
        name: '',
        address: '',
        location: { type: 'Point', coordinates: [0, 0] },
        capacity: 0,
      };
      // Optionally navigate to the shelters list after adding
      this.router.navigate(['/shelters']);
    });
  }

  editShelter(shelter: any): void {
    // Logic to edit shelter
  }

  deleteShelter(id: string): void {
    this.shelterService.deleteShelter(id).subscribe(() => {
      this.shelters = this.shelters.filter(s => s._id !== id);
    });
  }
}
