import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "src/app/shared/service/application.service";
import { ApplicationDTO } from "src/app/shared/application.dto";

interface EstadoOption {
    label: string;
    value: string;
}

@Component({
    selector: "app-profesor-dashboard",
    templateUrl: "./profesor-dashboard.component.html",
    styleUrls: ["./profesor-dashboard.component.scss"],
})
export class ProfesorDashboardComponent implements OnInit {
    applications: ApplicationDTO[] = [];
    filteredApplications: ApplicationDTO[] = [];
    selectedApplicationId?: number;

    filtroTitulo: string = "";
    filtroIsbn: string = "";
    filtroTipo: string = "";
    filtroAutor: string = "";
    filtroEstado: string = "ALL";
    filtroFechaRadicadoDesde?: Date;
    filtroFechaRadicadoHasta?: Date;
    filtroFechaPublicacionDesde?: string;
    filtroFechaPublicacionHasta?: string;

    isLoading = false;

    estados: EstadoOption[] = [
        { label: "Todas", value: "ALL" },
        { label: "Radicada", value: "RADICADA" },
        { label: "En proceso", value: "EN_PROCESO" },
        { label: "Devuelta", value: "DEVUELTA" },
        { label: "Rechazada", value: "RECHAZADA" },
    ];

    tiposCertificacion: string[] = [
        "ISBN",
        "Depósito Legal",
        "Certificación Editorial",
        "Otra",
    ];

    constructor(private applicationService: ApplicationService) {}

    ngOnInit(): void {
        this.cargarMisAplicaciones();
    }

    cargarMisAplicaciones(): void {
        this.isLoading = true;
        this.applicationService.getMyApplications().subscribe({
            next: (apps) => {
                this.applications = apps;
                this.filtrarAplicaciones();
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                console.error("Error cargando aplicaciones del profesor", err);
            },
        });
    }

    filtrarAplicaciones(): void {
        let apps = this.applications;

        // Filtro por estado "simplificado"
        if (this.filtroEstado !== "ALL") {
            apps = apps.filter(
                (app) =>
                    this.estadoSimplificado(app.status) === this.filtroEstado
            );
        }
        if (this.filtroTitulo.trim()) {
            apps = apps.filter((app) =>
                (app.bookTitle || "")
                    .toLowerCase()
                    .includes(this.filtroTitulo.trim().toLowerCase())
            );
        }
        if (this.filtroIsbn.trim()) {
            apps = apps.filter((app) =>
                (app.isbnCode || "")
                    .toLowerCase()
                    .includes(this.filtroIsbn.trim().toLowerCase())
            );
        }
        if (this.filtroAutor.trim()) {
            apps = apps.filter((app) =>
                (app.authorName || "")
                    .toLowerCase()
                    .includes(this.filtroAutor.trim().toLowerCase())
            );
        }
        if (this.filtroTipo) {
            apps = apps.filter((app) =>
                (app.certificationType || "")
                    .toLowerCase()
                    .includes(this.filtroTipo.toLowerCase())
            );
        }
        // Filtro por fecha de radicado
        if (this.filtroFechaRadicadoDesde) {
            apps = apps.filter(
                (app) =>
                    app.createdAt &&
                    new Date(app.createdAt) >= this.filtroFechaRadicadoDesde!
            );
        }
        if (this.filtroFechaRadicadoHasta) {
            apps = apps.filter(
                (app) =>
                    app.createdAt &&
                    new Date(app.createdAt) <= this.filtroFechaRadicadoHasta!
            );
        }
        // Filtro por fecha de publicación
        if (this.filtroFechaPublicacionDesde) {
            apps = apps.filter(
                (app) =>
                    app.publicationYear &&
                    Number(app.publicationYear) >=
                        Number(this.filtroFechaPublicacionDesde)
            );
        }
        if (this.filtroFechaPublicacionHasta) {
            apps = apps.filter(
                (app) =>
                    app.publicationYear &&
                    Number(app.publicationYear) <=
                        Number(this.filtroFechaPublicacionHasta)
            );
        }

        this.filteredApplications = apps.sort(
            (a, b) =>
                new Date(b.createdAt ?? "").getTime() -
                new Date(a.createdAt ?? "").getTime()
        );
    }

    onFiltroChange(): void {
        this.filtrarAplicaciones();
    }

    limpiarFiltros(): void {
        this.filtroTitulo = "";
        this.filtroIsbn = "";
        this.filtroTipo = "";
        this.filtroAutor = "";
        this.filtroEstado = "ALL";
        this.filtroFechaRadicadoDesde = undefined;
        this.filtroFechaRadicadoHasta = undefined;
        this.filtroFechaPublicacionDesde = "";
        this.filtroFechaPublicacionHasta = "";
        this.filtrarAplicaciones();
    }

    view(id: number): void {
        this.selectedApplicationId = id;
    }

    onModalClose(): void {
        this.selectedApplicationId = undefined;
        this.cargarMisAplicaciones();
    }

    // Regla para mostrar estado simplificado
    estadoSimplificado(estado: string): string {
        if (estado === "RADICADA") return "RADICADA";
        if (/RECHAZADA/.test(estado)) return "RECHAZADA";
        if (/DEVUELTA/.test(estado)) return "DEVUELTA";
        return "EN_PROCESO";
    }

    // Lo que se muestra en la columna de estado
    traducirEstado(estado: string): string {
        if (estado === "RADICADA") return "Radicada";
        if (/RECHAZADA/.test(estado)) return "Rechazada";
        if (/DEVUELTA/.test(estado)) return "Devuelta";
        return "En proceso";
    }
}
