
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {

  alimentos: any[] = [];
  alimentosFiltrados: any[] = [];
  historial: any[] = [];

  busqueda = '';
  filtroEstado = 'Todos';
  cargando = true;
  error = '';

  constructor(
    private router: Router,
    private alimentosService: Alimentos,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
    this.cargarAlimentos();
    this.registrarActividad('Ingreso al módulo de usuario');
  }

  cargarHistorial(): void {
    this.historial = JSON.parse(
      localStorage.getItem('historialUsuario') || '[]'
    );
  }

  cargarAlimentos(): void {
    this.cargando = true;
    this.error = '';

    this.alimentosService.obtenerAlimentos().subscribe({
      next: (datos) => {
        this.alimentos = datos;
        this.aplicarFiltros();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar alimentos:', err);

        this.error =
          'No se pudieron cargar los alimentos. Verifica que el servidor esté funcionando.';

        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros(): void {
    const texto = this.busqueda.trim().toLowerCase();

    this.alimentosFiltrados = this.alimentos.filter((alimento) => {
      const coincideNombre = (alimento.producto || '')
        .toLowerCase()
        .includes(texto);

      const coincideEstado =
        this.filtroEstado === 'Todos' ||
        alimento.estado === this.filtroEstado;

      return coincideNombre && coincideEstado;
    });
  }

  get proximosAVencer(): any[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.alimentos.filter((alimento) => {
      const fecha = new Date(alimento.fechaVencimiento);
      fecha.setHours(0, 0, 0, 0);

      const dias = Math.round(
        (fecha.getTime() - hoy.getTime()) / 86400000
      );

      return dias >= 0 && dias <= 3;
    });
  }

  get alimentosVencidos(): any[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.alimentos.filter((alimento) => {
      const fecha = new Date(alimento.fechaVencimiento);
      fecha.setHours(0, 0, 0, 0);

      return fecha.getTime() < hoy.getTime();
    });
  }

  diasParaVencer(fechaVencimiento: string): number {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(fechaVencimiento);
    fecha.setHours(0, 0, 0, 0);

    return Math.round(
      (fecha.getTime() - hoy.getTime()) / 86400000
    );
  }

  registrarActividad(accion: string): void {
    const historial = JSON.parse(
      localStorage.getItem('historialUsuario') || '[]'
    );

    historial.unshift({
      accion,
      fecha: new Date().toLocaleString('es-EC')
    });

    localStorage.setItem(
      'historialUsuario',
      JSON.stringify(historial.slice(0, 100))
    );

    this.cargarHistorial();
  }

  cerrarSesion(): void {
    this.registrarActividad('Cierre de sesión');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}