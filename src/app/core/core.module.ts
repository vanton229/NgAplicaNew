import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorIntercept, ConectorService, SysutilModule } from '@laranda/lib-sysutil';
import { VisualModule } from '@laranda/lib-visual';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CasosComponent } from './components/casos/casos.component';
import { MejorasComponent } from './components/mejoras/mejoras.component';
import { VisitasComponent } from './components/visitas/visitas.component';

export function ConectorServiceJson(conectorService: ConectorService) {
  return () => conectorService.getParametros();
}

@NgModule({
  declarations: [
    PrincipalComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    Error404Component,
    HomeComponent,
    CasosComponent,
    MejorasComponent,
    VisitasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SysutilModule,
    VisualModule,
  ],
  providers: [
        ConectorService,
        
        {
            provide: APP_INITIALIZER,
            useFactory: ConectorServiceJson,
            deps: [ConectorService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorIntercept,
            multi: true
        }    
  ]
})
export class CoreModule { }
