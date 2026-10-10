
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lotes } from '../../../../core/services/lotes';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-lista-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-lotes.html',
  styleUrl: './lista-lotes.css'
})
export class ListaLotes implements OnInit {

  lotes: any[] = [];
  alimentos: any[] = [];

  cargando = true;
  error = '';
  mensaje = '';
  mostrarFormulario = false;
  guardando = false;

  nuevoLote: any = {
    codigoLote: '',
    cantidad: 1,
    fechaVencimiento: '',
    precioUnitario: 0,
    alimentoId: null
  };

  constructor(
    private lotesService: Lotes,
    private alimentosService: Alimentos,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarLotes();
    this.cargarAlimentos();
  }

  cargarLotes(): void {
    this.cargando = true;
    this.error = '';

    this.lotesService.obtenerLotes().subscribe({
      next: (datos) => {
        this.lotes = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los lotes:', err);
        this.error = 'No se pudieron cargar los lotes. Verifica que el backend esté funcionando.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarAlimentos(): void {
    this.alimentosService.obtenerAlimentos().subscribe({
      next: (datos) => {
        this.alimentos = datos;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los alimentos:', err);
      }
    });
  }

  registrarLote(): void {
    this.error = '';
    this.mensaje = '';

    if (
      !this.nuevoLote.codigoLote.trim() ||
      !this.nuevoLote.alimentoId ||
      !this.nuevoLote.fechaVencimiento ||
      this.nuevoLote.cantidad <= 0 ||
      this.nuevoLote.precioUnitario < 0
    ) {
      this.error = 'Completa los campos correctamente antes de guardar.';
      return;
    }

    this.guardando = true;

    this.lotesService.crearLote(this.nuevoLote).subscribe({
      next: () => {
        this.mensaje = 'Lote registrado correctamente.';
        this.nuevoLote = {
          codigoLote: '',
          cantidad: 1,
          fechaVencimiento: '',
          precioUnitario: 0,
          alimentoId: null
        };
        this.mostrarFormulario = false;
        this.guardando = false;
        this.cargarLotes();
      },
      error: (err) => {
        console.error('Error al registrar el lote:', err);
        this.error = err.error || 'No se pudo registrar el lote.';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }
}