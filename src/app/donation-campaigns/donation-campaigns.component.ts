import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';

@Component({
  selector: 'app-donation-campaigns',
  templateUrl: './donation-campaigns.component.html',
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
  editMode = false;
  donationToEditId: string | null = null;

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
      this.resetForm();
    });
  }

  deleteDonation(id: string): void {
    this.donationService.deleteDonation(id).subscribe(() => {
      this.donations = this.donations.filter(d => d._id !== id);
    });
  }

  // Set the form fields with the selected donation data for editing
  editDonation(donation: any): void {
    this.editMode = true;
    this.donationToEditId = donation._id;
    this.newDonation = { 
      title: donation.title,
      description: donation.description,
      amount: donation.amount,
      raisedAmount: donation.raisedAmount 
    };
  }

  // Update the donation campaign with the edited data
  updateDonation(): void {
    if (!this.donationToEditId) return;

    this.donationService.updateDonation(this.donationToEditId, this.newDonation).subscribe(() => {
      this.fetchDonations(); // Refresh the list after updating
      this.resetForm();
    });
  }

  // Cancel edit mode and reset the form
  cancelEdit(): void {
    this.resetForm();
  }

  // Reset form and clear edit mode
  private resetForm(): void {
    this.newDonation = { title: '', description: '', amount: 0, raisedAmount: 0 };
    this.editMode = false;
    this.donationToEditId = null;
  }
}
