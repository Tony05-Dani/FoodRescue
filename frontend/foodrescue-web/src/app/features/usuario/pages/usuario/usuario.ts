import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {

  constructor(private router: Router) {}

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}