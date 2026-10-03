import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {

  alimentosDisponibles = 12;
  consumoPrioritario = 5;
  alimentosVencidos = 3;
  totalAlimentos = 20;

}