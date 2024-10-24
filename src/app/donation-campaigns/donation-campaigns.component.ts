import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service'; // Ensure the DonationService is created and injected

@Component({
  selector: 'app-donation-campaigns',
  templateUrl: '/donation-campaigns.component.html',
  styleUrls: ['./donation-campaigns.component.css'],
})
export class DonationCampaignsComponent implements OnInit {
  newDonation = {
    title: '',
    description: '',
    amount: 0,
    raisedAmount: 0,
  };

  donations: any[] = [];

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.fetchDonations();
  }

  fetchDonations(): void {
    this.donationService.getDonations().subscribe((data: any) => {
      this.donations = data;
    });
  }

  createDonation(): void {
    this.donationService.createDonation(this.newDonation).subscribe((donation) => {
      this.donations.push(donation);
      this.newDonation = {
        title: '',
        description: '',
        amount: 0,
        raisedAmount: 0,
      };
    });
  }

  deleteDonation(id: string): void {
    this.donationService.deleteDonation(id).subscribe(() => {
      this.donations = this.donations.filter(d => d._id !== id);
    });
  }
}