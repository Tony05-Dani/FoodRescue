
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

  abrirDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  abrirAlimentos(): void {
    this.router.navigate(['/admin/alimentos']);
  }

  abrirLotes(): void {
  this.router.navigate(['/admin/lotes']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}

