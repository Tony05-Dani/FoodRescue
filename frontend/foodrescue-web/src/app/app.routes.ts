import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/pages/admin/admin')
        .then(m => m.Admin)
  },

  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/pages/dashboard-admin/dashboard-admin')
        .then(m => m.DashboardAdmin)
  },

  {
    path: 'usuario',
    loadComponent: () =>
      import('./features/usuario/pages/usuario/usuario')
        .then(m => m.Usuario)
  }

];