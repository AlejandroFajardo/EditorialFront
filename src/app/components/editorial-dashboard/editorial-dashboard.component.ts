import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { AppBreadcrumbService } from 'src/app/shared/app.breadcrumb.service';
import { AuthService } from 'src/app/shared/authService';
import { environment } from 'src/environments/environment.dev';

interface ApplicationDTO {
  id: number;
  authorName: string;
  certificationType: string;
  bookTitle: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './editorial-dashboard.component.html',
  styleUrls: ['./editorial-dashboard.component.scss']
})
export class EditorialDashboardComponent implements OnInit {
  userData: any;
  userIsAdmin = false;

  applications: ApplicationDTO[] = [];
  filteredApplications: ApplicationDTO[] = [];
  selectedApplicationId?: number;
  searchText: string = '';

  estados = [
    { label: 'Todas', value: 'ALL' },
    { label: 'Nuevo', value: 'NEW' },
    { label: 'En revisión', value: 'UNDER_REVIEW' },
    { label: 'Por subsanar', value: 'PENDING_REVISION' },
    { label: 'Subsanada', value: 'RESUBMITTED' },
    { label: 'Aprobada', value: 'APPROVED' },
    { label: 'Rechazada', value: 'REJECTED' }
  ];
  estadoSeleccionado = 'ALL';

  isLoading = false;

  private readonly API_URL = environment.apiURL;

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private keycloak: KeycloakService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.breadcrumbService.setItems([{ label: 'Inicio' }]);
  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(profile => {
      this.userData = `${profile.firstName} ${profile.lastName}`;
      this.userIsAdmin = this.keycloak.isUserInRole('backendAdmin', 'backend-starter');

      if (this.userIsAdmin) {
        this.loadApplications();
      }
    });
  }

  private loadApplications(): void {
    this.http.get<ApplicationDTO[]>(`${this.API_URL}api/applications`)
      .subscribe({
        next: apps => {
          this.applications = apps;
          this.onSearchChange(); // Aplica ambos filtros siempre
        },
        error: err => console.error('Error cargando aplicaciones', err)
      });
  }

  onSearchChange(): void {
    const text = this.searchText.toLowerCase().trim();
    let apps = this.applications;

    // Filtro por estado
    if (this.estadoSeleccionado !== 'ALL') {
      apps = apps.filter(app => app.status === this.estadoSeleccionado);
    }

    // Filtro por texto general
    if (text) {
      this.filteredApplications = apps.filter(app =>
        (app.authorName && app.authorName.toLowerCase().includes(text)) ||
        (app.bookTitle && app.bookTitle.toLowerCase().includes(text)) ||
        (app.certificationType && app.certificationType.toLowerCase().includes(text))
      );
    } else {
      this.filteredApplications = apps;
    }

    // Ordena por fecha descendente
    this.filteredApplications = this.filteredApplications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  onEstadoChange(): void {
    this.onSearchChange();
  }

  view(id: number): void {
    const app = this.applications.find(a => a.id === id);
    // Solo cambia a UNDER_REVIEW si no está aprobada o rechazada
    if (app && app.status !== 'UNDER_REVIEW' && app.status !== 'APPROVED' && app.status !== 'REJECTED') {
      this.isLoading = true;
      app.status = 'UNDER_REVIEW';
      this.http.patch(`${this.API_URL}api/applications/${id}/status`, { status: 'UNDER_REVIEW' })
        .subscribe({
          next: () => {
            this.selectedApplicationId = id;
            this.isLoading = false;
            this.loadApplications();
          },
          error: err => {
            console.error('Error actualizando estado', err);
            this.isLoading = false;
          }
        });
    } else {
      this.selectedApplicationId = id;
      this.isLoading = false;
    }
  }

  onModalClose(): void {
    this.selectedApplicationId = undefined;
    this.loadApplications();
  }

  traducirEstado(estado: string): string {
    switch (estado) {
      case 'NEW': return 'Nuevo';
      case 'UNDER_REVIEW': return 'En revisión';
      case 'PENDING_REVISION': return 'Por subsanar';
      case 'RESUBMITTED': return 'Subsanada';
      case 'APPROVED': return 'Aprobada';
      case 'REJECTED': return 'Rechazada';
      default: return estado;
    }
  }
}
