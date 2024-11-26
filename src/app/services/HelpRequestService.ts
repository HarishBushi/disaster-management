import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelpRequestService {
  private apiUrl = 'http://localhost:5000/api/help-requests';  // Your backend URL

  constructor(private http: HttpClient) {}

  createHelpRequest(request: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  getHelpRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteHelpRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateHelpRequest(id:any,donation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, donation);
  }
}
