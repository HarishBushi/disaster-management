import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private apiUrl = 'http://localhost:3000/api/donations'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Get all donation campaigns
  getDonations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a new donation campaign
  createDonation(donation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, donation);
  }

  // Delete a donation campaign by its ID
  deleteDonation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
