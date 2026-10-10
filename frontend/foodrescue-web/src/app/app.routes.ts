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
    path: 'admin/alimentos',
    loadComponent: () =>
      import('./features/alimentos/pages/lista-alimentos/lista-alimentos')
        .then(m => m.ListaAlimentos)
  },

  {
    path: 'admin/alimentos/crear',
    loadComponent: () =>
      import('./features/alimentos/pages/crear-alimento/crear-alimento')
        .then(m => m.CrearAlimento)
  },

  {
    path: 'admin/alimentos/editar/:id',
    loadComponent: () =>
      import('./features/alimentos/pages/editar-alimento/editar-alimento')
        .then(m => m.EditarAlimento)
  },

  
  {
  path: 'admin/lotes',
  loadComponent: () =>
    import('./features/lotes/pages/lista-lotes/lista-lotes')
      .then(m => m.ListaLotes)
  },

  {
    path: 'usuario',
    loadComponent: () =>
      import('./features/usuario/pages/usuario/usuario')
        .then(m => m.Usuario)
  }

];