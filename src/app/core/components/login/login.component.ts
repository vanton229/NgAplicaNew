import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service'; // Asegúrate de ajustar tu ruta
import { ConectorService } from '@laranda/lib-sysutil';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
  verPass!: string;

  constructor(
    private authService: AuthService, 
    private fb: UntypedFormBuilder,
    private conectorService: ConectorService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z|A-Z0-9._%+-]+@[a-z|A-Z0-9.-]+\\.[a-z|A-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.verPass = 'password';
      // this.conectorService.getParametros();
  }

  get usuarioNoValido() {
    return (this.formLogin.get('correo')?.invalid && this.formLogin.get('correo')?.touched);
  }

  get passwordNoValido() {
    return (this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched);
  }

  onLogin() {

     
    Object.values(this.formLogin.controls).forEach(control => {
      control.markAllAsTouched();

    });

    if (this.formLogin.valid) {
      const correo = this.formLogin.value.correo;
      const password = this.formLogin.value.password;

      this.authService.autentica_cliente(this.conectorService.info.URL_REST, correo, password).subscribe({
        next: (resp) => {
          if (resp.Status === 0) {
              this.router.navigate(['/']);
          } else {
            console.warn('Error en credenciales:', resp.Mensaje);
            Swal.fire('Advertencia', 'Las credenciales son incorrectas.', 'warning');
          }
        },
        error: (err) => {
          console.error('Error de conexión con la API:', err);
        }
      });
    }
  }

  claveVisible() {
    this.verPass = 'text';
  }
  
  claveOculta() {
    this.verPass = 'password';
  }
}