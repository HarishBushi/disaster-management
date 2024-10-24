import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private apiUrl = 'http://localhost:3000/api/shelters'; // Adjust the URL based on your backend API

  constructor(private http: HttpClient) {}

  // Fetch all shelters
  getShelters(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Create a new shelter
  createShelter(shelter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, shelter);
  }

  // Update an existing shelter
  updateShelter(id: string, shelter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, shelter);
  }

  // Delete a shelter
  deleteShelter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
