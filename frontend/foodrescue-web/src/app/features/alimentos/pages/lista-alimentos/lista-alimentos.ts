import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-lista-alimentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-alimentos.html',
  styleUrl: './lista-alimentos.css'
})
export class ListaAlimentos implements OnInit {

  alimentos: any[] = [];

  constructor(
    private alimentosService: Alimentos,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAlimentos();
  }

  cargarAlimentos(): void {
    this.alimentosService.obtenerAlimentos().subscribe({
      next: (datos) => {
        console.log('Alimentos recibidos:', datos);

        this.alimentos = datos;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener los alimentos:', error);
      }
    });
  }

  nuevoAlimento(): void {
    this.router.navigate(['/admin/alimentos/crear']);
  }
  volver(): void {
  this.router.navigate(['/admin']);
  }
  editarAlimento(id: number): void {
  this.router.navigate(['/admin/alimentos/editar', id]);
  }
  eliminarAlimento(id: number): void {
  const confirmar = confirm('¿Estás seguro de eliminar este alimento?');

  if (!confirmar) {
    return;
  }

  this.alimentosService.eliminarAlimento(id).subscribe({
    next: () => {
      alert('Alimento eliminado correctamente.');
      this.cargarAlimentos();
    },
    error: (error) => {
      console.error('Error al eliminar el alimento:', error);
      alert('No se pudo eliminar el alimento.');
    }
  });
}
}