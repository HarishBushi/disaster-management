import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDisasterAlert } from './disaster-alert.interface'; // Create this interface

@Injectable({
  providedIn: 'root',
})
export class DisasterService {
  private apiUrl = 'http://localhost:5000/api/alerts'; // Your backend URL

  constructor(private http: HttpClient) {}

  createAlert(alert: IDisasterAlert): Observable<IDisasterAlert> {
    return this.http.post<IDisasterAlert>(this.apiUrl, alert);
  }

  getAlerts(): Observable<IDisasterAlert[]> {
    return this.http.get<IDisasterAlert[]>(this.apiUrl);
  }

  updateAlert(id: string, alert: IDisasterAlert): Observable<IDisasterAlert> {
    return this.http.put<IDisasterAlert>(`${this.apiUrl}/${id}`, alert);
  }

  deleteAlert(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
