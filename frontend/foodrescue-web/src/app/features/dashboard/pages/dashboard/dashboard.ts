import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alimentos } from '../../../../core/services/alimentos';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  alimentos: any[] = [];

  constructor(private alimentosService: Alimentos) {}

  ngOnInit(): void {
    this.alimentosService.obtenerAlimentos().subscribe({
      next: (datos) => {
        this.alimentos = datos;
      },
      error: (error) => {
        console.error('Error al obtener los alimentos:', error);
      }
    });
  }
}