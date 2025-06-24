import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationDTO } from '../application.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private baseUrl = 'http://localhost:8081/api/applications';

  constructor(private http: HttpClient) { }

  create(dto: ApplicationDTO): Observable<ApplicationDTO> {
    return this.http.post<ApplicationDTO>(this.baseUrl, dto);
  }

  list(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.baseUrl);
  }

  updateStatus(id: number, status: string, comments?: string): Observable<ApplicationDTO> {
    const url = `${this.baseUrl}/${id}/status?status=${status}`;
    return this.http.put<ApplicationDTO>(url, comments);
  }

  getAll() {
  return this.http.get<ApplicationDTO[]>(`${environment.apiURL}/api/applications`);
  }
}