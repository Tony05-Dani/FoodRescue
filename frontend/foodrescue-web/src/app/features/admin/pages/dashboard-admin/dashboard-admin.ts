
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin implements OnInit {

  alimentos: any[] = [];

  constructor(
    private alimentosService: Alimentos,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alimentosService.obtenerAlimentos().subscribe({
      next: (datos) => {
        this.alimentos = datos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener los alimentos:', error);
      }
    });
  }

  irAlimentos(): void {
    this.router.navigate(['/admin/alimentos']);
  }
  volver(): void {
  this.router.navigate(['/admin']);
  }
}

