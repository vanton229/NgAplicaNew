import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticaCli } from '@laranda/lib-ultra-net';

@Injectable({
  providedIn: 'root'
})
export class CambiaCLGuard implements CanActivate {

  constructor(
    private autenticaCli: AutenticaCli,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (this.autenticaCli.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
