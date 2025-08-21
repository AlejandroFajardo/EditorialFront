import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.dev";
import { ApplicationDTO } from "../application.dto";

@Injectable({ providedIn: "root" })
export class ApplicationService {
    private baseUrl = `${environment.apiURL}/api/applications`;

    constructor(private http: HttpClient) {}

    create(dto: ApplicationDTO): Observable<ApplicationDTO> {
        return this.http.post<ApplicationDTO>(this.baseUrl, dto);
    }

    getAll(
        filters: {
            usuarioId?: number;
            status?: string;
            bookTitle?: string;
            isbnCode?: string;
            publicationYear?: string | number;
            [key: string]: any;
        } = {}
    ): Observable<ApplicationDTO[]> {
        let params = new HttpParams();
        Object.entries(filters).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "")
                params = params.set(k, v.toString());
        });
        return this.http.get<ApplicationDTO[]>(this.baseUrl, { params });
    }

    /**
     * Obtiene las aplicaciones del usuario actual.
     * Si se pasa un email, lo envía como parámetro para el backend (SOLO EN DESARROLLO).
     */
    getMyApplications(): Observable<ApplicationDTO[]> {
        // No envía ningún parámetro, siempre.
        return this.http.get<ApplicationDTO[]>(`${this.baseUrl}/mine`);
    }

    getById(id: number): Observable<ApplicationDTO> {
        return this.http.get<ApplicationDTO>(`${this.baseUrl}/${id}`);
    }

    updateStatus(
        id: number,
        status: string,
        comments?: string
    ): Observable<ApplicationDTO> {
        const url = `${this.baseUrl}/${id}/status`;
        return this.http.put<ApplicationDTO>(url, { status, comments });
    }
}
