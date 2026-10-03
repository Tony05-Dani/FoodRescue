import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(private router: Router) {}

  abrirDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}