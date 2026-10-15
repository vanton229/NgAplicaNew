import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CambiaCLGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (this.authService.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
