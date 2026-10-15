import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { PrincipalComponent } from './core/components/principal/principal.component';
import { Error404Component } from './core/components/error404/error404.component';
import { UsuarioGuard } from './core/guards/usuario.guard';


 const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PrincipalComponent, canActivate: [ UsuarioGuard ]},
  { path: '**', component: Error404Component }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
