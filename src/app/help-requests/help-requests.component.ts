import { Component, OnInit } from '@angular/core';
import { HelpRequestService } from '../services/HelpRequestService';

@Component({
  selector: 'app-help-requests',
  templateUrl: './help-requests.component.html',
  styleUrls: ['./help-requests.component.css'],
})
export class HelpRequestsComponent implements OnInit {
  newRequest = {
    name: '',
    description: '',
    location: { type: 'Point', coordinates: [0, 0] }
  };

  helpRequests: any[] = [];
  editMode = false;
  requestToEditId: string | null = null;

  constructor(private helpRequestService: HelpRequestService) {}

  ngOnInit(): void {
    this.fetchHelpRequests();
  }

  fetchHelpRequests(): void {
    this.helpRequestService.getHelpRequests().subscribe((data: any) => {
      this.helpRequests = data;
    });
  }

  createHelpRequest(): void {
    this.helpRequestService.createHelpRequest(this.newRequest).subscribe((request) => {
      this.helpRequests.push(request);
      this.resetForm();
    });
  }

  deleteHelpRequest(id: string): void {
    this.helpRequestService.deleteHelpRequest(id).subscribe(() => {
      this.helpRequests = this.helpRequests.filter(r => r._id !== id);
    });
  }

  // Set form with data for editing
  editHelpRequest(request: any): void {
    this.editMode = true;
    this.requestToEditId = request._id;
    this.newRequest = {
      name: request.name,
      description: request.description,
      location: { type: 'Point', coordinates: [...request.location.coordinates] }
    };
  }

  // Update the help request
  updateHelpRequest(): void {
    if (!this.requestToEditId) return;

    this.helpRequestService.updateHelpRequest(this.requestToEditId, this.newRequest).subscribe(() => {
      this.fetchHelpRequests(); // Refresh the list after updating
      this.resetForm();
    });
  }

  // Cancel edit and reset the form
  cancelEdit(): void {
    this.resetForm();
  }

  // Reset form and clear edit mode
  private resetForm(): void {
    this.newRequest = { name: '', description: '', location: { type: 'Point', coordinates: [0, 0] } };
    this.editMode = false;
    this.requestToEditId = null;
  }
}
