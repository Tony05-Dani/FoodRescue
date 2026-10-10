
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

  constructor(private router: Router) {}

  cerrarSesion(): void {
    this.router.navigate(['/login']);
    
  }
  volver(): void {
   this.router.navigate(['/admin']);
 }
}

