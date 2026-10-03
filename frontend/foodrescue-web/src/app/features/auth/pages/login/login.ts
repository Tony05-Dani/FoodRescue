import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  contrasena = '';

  mostrarContrasena = false;

  error = '';

  constructor(private router: Router) {}

  iniciarSesion() {

    this.error = '';

    if (
      this.correo === 'admin@foodrescue.com' &&
      this.contrasena === 'Admin123'
    ) {

      localStorage.setItem('usuario', 'admin');

      this.router.navigate(['/admin']);

      return;
    }


    if (
      this.correo === 'usuario@foodrescue.com' &&
      this.contrasena === 'Usuario123'
    ) {

      localStorage.setItem('usuario', 'usuario');

      this.router.navigate(['/usuario']);

      return;
    }


    this.error = 'Correo o contraseña incorrectos';
  }


  cambiarContrasena() {

    this.mostrarContrasena =
      !this.mostrarContrasena;

  }

}