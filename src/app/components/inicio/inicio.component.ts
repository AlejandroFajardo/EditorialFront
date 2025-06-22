import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppBreadcrumbService } from 'src/app/shared/app.breadcrumb.service';
import { AuthService } from 'src/app/shared/authService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent {
  userData:any;
  userIsAdmin:boolean;
  prestamos:any[]=[];
  libros:any[]=[];

  private API_URL= environment.apiURL;
  userIdTercero: any;
  terceroData: any;
  terceroDataList: any[]=[];
  accessToken: any;
  userName: string;
  
  constructor(private breadcrumbService: AppBreadcrumbService, 
    private keycloak: KeycloakService,
    private http:HttpClient,
    private authService:AuthService) {
    this.breadcrumbService.setItems([
        {label: 'Inicio'}
    ]); 
    keycloak.loadUserProfile().then(
      profile => {
        console.log(profile)
        this.userName = profile.username

        this.authService.login(environment.authUser, environment.authPass).subscribe(
          response => {
            this.accessToken = response.access_token
            this.authService.getIdTercero('johana.nino',this.accessToken).subscribe(   //First we get the Id tercero in  order to query the data
              response=>{
                this.userIdTercero = response
                this.authService.getTerceroById(this.userIdTercero,this.accessToken).subscribe(  //Now we query all the user data
                  response=>{
                    this.terceroData = response;
                    this.terceroDataList.push(this.terceroData)
                  });
                  });
          });

        this.userData = profile.firstName + ' ' + profile.lastName;
                this.userIsAdmin = keycloak.isUserInRole("backendAdmin","backend-starter");

        if(this.userIsAdmin){
          this.http.get<any>(this.API_URL + "prestamos")
          .subscribe(
            data => {
              this.prestamos = data;
              console.log(data);
            },
            error => {
              console.error("Error obteniendo los datos", error);
            }
          );
        }
        else{
          this.http.get<any>(this.API_URL + "libros")
          .subscribe(
            data => {
              this.libros = data;
              console.log(data);
            },
            error => {
              console.error("Error obteniendo los datos", error);
            }
          );
        }
      }
    );


}

displayWelcome:boolean = true;

}
