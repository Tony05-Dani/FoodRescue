
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';

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

  guardando = false;

  constructor(
    private alimentosService: Alimentos,
    private router: Router
  ) {}

  guardar(): void {

    if (
      !this.alimento.producto ||
      !this.alimento.cantidad ||
      !this.alimento.fechaVencimiento ||
      !this.alimento.tipoAlimento ||
      !this.alimento.responsable
    ) {
      alert('Completa todos los campos.');
      return;
    }

    this.guardando = true;

    this.alimentosService.crearAlimento(this.alimento).subscribe({
      next: () => {
        alert('Alimento registrado correctamente.');
        this.router.navigate(['/admin/alimentos']);
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

