import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
tppantalla: number = 0;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  closeApp() {
    this.authService.logOut();
  }

 modificarpantalla(tipo: number) {
    this.tppantalla = tipo;
  }
}
