
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';
import { Lotes } from '../../../../core/services/lotes';

@Component({
  selector: 'app-crear-alimento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-alimento.html',
  styleUrl: './crear-alimento.css'
})
export class CrearAlimento {

  alimento = {
    producto: '',
    cantidad: 0,
    unidadMedida: 'Unidades',
    fechaVencimiento: '',
    tipoAlimento: '',
    estado: 'Disponible',
    responsable: ''
  };

  lote = {
    codigoLote: '',
    cantidad: 1,
    fechaVencimiento: '',
    precioUnitario: 0
  };

  guardando = false;

  constructor(
    private alimentosService: Alimentos,
    private lotesService: Lotes,
    private router: Router
  ) {}

  guardar(): void {
    if (
      !this.alimento.producto.trim() ||
      this.alimento.cantidad <= 0 ||
      !this.alimento.fechaVencimiento ||
      !this.alimento.tipoAlimento ||
      !this.alimento.responsable.trim() ||
      !this.lote.codigoLote.trim() ||
      this.lote.cantidad <= 0 ||
      !this.lote.fechaVencimiento ||
      this.lote.precioUnitario < 0
    ) {
      alert('Completa todos los campos correctamente.');
      return;
    }

    this.guardando = true;

    this.alimentosService.crearAlimento(this.alimento).subscribe({
      next: (alimentoCreado) => {
        const nuevoLote = {
          ...this.lote,
          alimentoId: alimentoCreado.id
        };

        this.lotesService.crearLote(nuevoLote).subscribe({
          next: () => {
            alert('Alimento y primer lote registrados correctamente.');
            this.router.navigate(['/admin/alimentos']);
          },
          error: (error) => {
            console.error('Error al registrar el lote:', error);
            alert(
              `El alimento se registró, pero el lote no. ` +
              `El alimento tiene el ID ${alimentoCreado.id}. ` +
              'Puedes registrar el lote desde la gestión de lotes.'
            );
            this.guardando = false;
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar el alimento:', error);
        alert('No se pudo registrar el alimento.');
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/alimentos']);
  }
}
