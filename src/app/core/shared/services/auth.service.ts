import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CadOutAutenticaCli, ParamInAutenticaCli } from '../classes/data_Autentica_Cliente';
import { Router } from '@angular/router';

export interface ApiResponse {
  Status: number;
  Mensaje: string;
  CadJson: CadOutAutenticaCli;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //private apiUrl = 'http://la2k12.eastus.cloudapp.azure.com:8079/Pview/PViewISAPI.dll/la/rest/TView/WAutentica_cliente';
  //private readonly TOKEN_KEY = 'usuarioAuth';

  CadOut: CadOutAutenticaCli = new CadOutAutenticaCli();
  constructor(private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Método para autenticar al cliente
   */
  autentica_cliente(url: string, user: string, pass: string): Observable<ApiResponse> {
    const credenciales = new ParamInAutenticaCli();
    credenciales.Email = user;
    credenciales.Password = pass;
    
    const body = {
      Json: true,
      Param: credenciales
    };
    
  //private apiUrl = 'http://la2k12.eastus.cloudapp.azure.com:8079/Pview/PViewISAPI.dll/la/rest/TView/WAutentica_cliente';
    return this.http.post<ApiResponse>(url+'WAutentica_cliente', body).pipe(
      tap(response => {
        if (response.Status === 0) {
          //localStorage.setItem(this.TOKEN_KEY, JSON.stringify(response.CadJson));
          this.CadOut = response.CadJson;
          sessionStorage.setItem('user', JSON.stringify(response.CadJson));
        }
      })
    )
  }

  leerToken() {
    if ( sessionStorage.getItem('user') ) {
      this.CadOut = JSON.parse(sessionStorage.getItem('user')!);
    } 
  }

  estaAutenticado(): boolean {
    this.leerToken();
    return this.CadOut.Token !== '';
  }

  logOut(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expira');
    this.router.navigateByUrl('/login');
  }
}