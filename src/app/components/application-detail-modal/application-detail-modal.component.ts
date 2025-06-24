import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

interface ApplicationDTO {
  id: number;
  centerEmail: string;
  authorName: string;
  certificationType: string;
  bookTitle: string;
  isbnCode: string;
  publicationYear: number;
  publicationLocation: string;
  publisher: string;
  publisherWebsiteUrl: string;
  chapterTitle?: string;
  manuscriptUrl: string;
  certificationFormUrl: string;
  extraDocumentUrls: string[];
  status: string;
  adminComments?: string;
  createdAt: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-application-detail-modal',
  templateUrl: './application-detail-modal.component.html',
  styleUrls: ['./application-detail-modal.component.scss']
})
export class ApplicationDetailModalComponent implements OnInit {
  @Input() applicationId!: number;
  @Output() close = new EventEmitter<void>();

  application?: ApplicationDTO;
  loading = false;
  actionLoading = false; // spinner para aprobar/rechazar
  errorMessage?: string;
  visible = false;

  private API_URL = environment.apiURL;

  ngOnInit(): void {
    if (this.applicationId != null) {
      this.visible = true;
      this.loadDetails();
    }
  }

  loadDetails(): void {
    this.loading = true;
    this.http.get<ApplicationDTO>(`${this.API_URL}api/applications/${this.applicationId}`)
      .subscribe({
        next: data => {
          this.application = data;
          this.loading = false;
        },
        error: err => {
          this.errorMessage = 'No se pudieron cargar los detalles';
          this.loading = false;
        }
      });
  }

  aprobar(): void {
    if (!this.application || this.actionLoading || this.isFinalState()) return;
    this.actionLoading = true;
    this.http.patch(`${this.API_URL}api/applications/${this.applicationId}/status`, { status: 'APPROVED' })
      .subscribe({
        next: () => {
          if (this.application) this.application.status = 'APPROVED';
          this.actionLoading = false;
        },
        error: err => {
          this.errorMessage = 'No se pudo aprobar la solicitud';
          this.actionLoading = false;
        }
      });
  }

  rechazar(): void {
    if (!this.application || this.actionLoading || this.isFinalState()) return;
    this.actionLoading = true;
    this.http.patch(`${this.API_URL}api/applications/${this.applicationId}/status`, { status: 'REJECTED' })
      .subscribe({
        next: () => {
          if (this.application) this.application.status = 'REJECTED';
          this.actionLoading = false;
        },
        error: err => {
          this.errorMessage = 'No se pudo rechazar la solicitud';
          this.actionLoading = false;
        }
      });
  }

  traducirEstado(status: string): string {
    switch (status) {
      case 'NEW': return 'Nuevo';
      case 'UNDER_REVIEW': return 'En revisión';
      case 'PENDING_REVISION': return 'Por subsanar';
      case 'RESUBMITTED': return 'Subsanada';
      case 'APPROVED': return 'Aprobada';
      case 'REJECTED': return 'Rechazada';
      default: return status;
    }
  }

  isFinalState(): boolean {
    return this.application?.status === 'APPROVED' || this.application?.status === 'REJECTED';
  }

  onClose(): void {
    this.visible = false;
    this.close.emit();
  }
  
  constructor(private http: HttpClient) {}
}
