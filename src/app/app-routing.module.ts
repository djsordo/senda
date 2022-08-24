import { NgModule } from '@angular/core';
import { PreloadAllModules, 
          RouterModule, 
          Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modo-jugador',
    loadChildren: () => import('./modo-jugador/modo-jugador.module').then( m => m.ModoJugadorPageModule)
  },
  {
    path: 'modo-accion',
    loadChildren: () => import('./modo-accion/modo-accion.module').then( m => m.ModoAccionPageModule)
  },
  {
    path: 'detalle-jugador',
    loadChildren: () => import('./detalle-jugador/detalle-jugador.module').then( m => m.DetalleJugadorPageModule)
  },
  {
    path: 'inicio-sel-jugadores',
    loadChildren: () => import('./inicio-sel-jugadores/inicio-sel-jugadores.module').then( m => m.InicioSelJugadoresPageModule)
  },
  {
    path: 'microfono',
    loadChildren: () => import('./microfono/microfono.module').then( m => m.MicrofonoPageModule)
  },
  {
    path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin/home/admin-home.module').then( m => m.AdminHomePageModule)
  }, 
  {
    path: 'admin/clubes', 
    loadChildren: () => import('./admin/clubes/admin-clubes.module').then( m => m.AdminClubesPageModule )
  },
  {
    path: 'admin/equipos', 
    loadChildren: () => import('./admin/equipos/admin-equipos.module').then( m => m.AdminEquiposPageModule )
  },
  {
    path: 'admin/usuarios', 
    loadChildren: () => import('./admin/usuarios/admin-usuarios.module').then( m => m.AdminEquiposPageModule )
  },
  {
    path: 'modo-ver',
    loadChildren: () => import('./modo-ver/modo-ver.module').then( m => m.ModoVerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
