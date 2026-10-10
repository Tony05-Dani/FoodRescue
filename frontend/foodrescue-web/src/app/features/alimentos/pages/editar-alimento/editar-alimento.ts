import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-editar-alimento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-alimento.html',
  styleUrl: './editar-alimento.css'
})
export class EditarAlimento implements OnInit {

  id: number = 0;

  alimento = {
    id: 0,
    producto: '',
    cantidad: 0,
    fechaVencimiento: '',
    tipoAlimento: '',
    estado: '',
    responsable: ''
  };

  guardando = false;

  constructor(
    private route: ActivatedRoute,
    private alimentosService: Alimentos,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.cargarAlimento();
  }

  cargarAlimento(): void {
    this.alimentosService.obtenerAlimentoPorId(this.id).subscribe({
      next: (datos) => {
        this.alimento = datos;
      },
      error: (error) => {
        console.error('Error al obtener el alimento:', error);
      }
    });
  }

  guardar(): void {
    this.guardando = true;

    this.alimentosService.actualizarAlimento(this.id, this.alimento).subscribe({
      next: () => {
        alert('Alimento actualizado correctamente.');
        this.router.navigate(['/admin/alimentos']);
      },
      error: (error) => {
        console.error('Error al actualizar el alimento:', error);
        alert('No se pudo actualizar el alimento.');
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/alimentos']);
  }
}