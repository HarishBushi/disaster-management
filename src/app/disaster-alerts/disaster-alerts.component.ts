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
    location: '',
    createdAt: new Date(),
  };
  editMode = false;
  alertToEditId: string | null = null;

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
      this.resetForm();
    });
  }

  deleteAlert(id: string): void {
    this.disasterService.deleteAlert(id).subscribe(() => {
      this.alerts = this.alerts.filter(alert => alert._id !== id);
    });
  }

  // Populate the form with alert data for editing
  editAlert(alert: any): void {
    this.editMode = true;
    this.alertToEditId = alert._id;
    this.newAlert = {
      type: alert.type,
      details: alert.details,
      location: alert.location ,
      createdAt: alert.createdAt,
    };
  }

  // Update the existing alert
  updateAlert(): void {
    if (!this.alertToEditId) return;

    this.disasterService.updateAlert(this.alertToEditId, this.newAlert).subscribe(() => {
      this.loadAlerts();
      this.resetForm();
    });
  }

  // Cancel the edit and reset the form
  cancelEdit(): void {
    this.resetForm();
  }

  // Reset form and clear edit mode
  private resetForm(): void {
    this.newAlert = { type: '', details: '', location: '', createdAt: new Date() };
    this.editMode = false;
    this.alertToEditId = null;
  }
}
