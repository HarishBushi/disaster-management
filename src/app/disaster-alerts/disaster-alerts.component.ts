import { Component, OnInit } from '@angular/core';
import { DisasterService } from '../services/disaster.service';
import { IDisasterAlert } from '../services/disaster-alert.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disaster-alerts',
  templateUrl: './disaster-alerts.component.html',
  styleUrls: ['./disaster-alerts.component.css'],
})
export class DisasterAlertsComponent implements OnInit {
  alerts: any[] = [];
  newAlert: IDisasterAlert = {
    type: '',
    details: '',
    location: { type: 'Point', coordinates: [0, 0] },
    createdAt: new Date(),
  };

  // constructor(private disasterService: DisasterService) {}
  constructor(private disasterService: DisasterService, private router: Router) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.disasterService.getAlerts().subscribe((data) => {
      this.alerts = data;
    });
  }

  createAlert(): void {
    this.disasterService.createAlert(this.newAlert).subscribe(() => {
      this.loadAlerts();
      this.newAlert = { type: '', details: '', location: { type: 'Point', coordinates: [0, 0] }, createdAt: new Date() };
    });
  }
  deleteDonation(id: string): void {
    this.disasterService.deleteAlert(id).subscribe(() => {
      this.alerts = this.alerts.filter(d => d._id !== id);
    });
  }

  // Additional methods for update and delete can be added here
}
