
import { Component, OnInit } from '@angular/core';
import { HelpRequestService } from '../services/HelpRequestService';  // Ensure you have this service

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
      this.newRequest = {
        name: '',
        description: '',
        location: { type: 'Point', coordinates: [0, 0] },
      };
    });
  }

  deleteHelpRequest(id: string): void {
    this.helpRequestService.deleteHelpRequest(id).subscribe(() => {
      this.helpRequests = this.helpRequests.filter(r => r._id !== id);
    });
  }

  // Optional: Add editHelpRequest logic here
}
