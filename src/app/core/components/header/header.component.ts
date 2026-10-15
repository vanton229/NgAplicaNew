import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  bodyText: string = '';

  constructor(
    public authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.authService.leerToken();
  }

  closeApp() {
    this.authService.logOut();
  }
}
