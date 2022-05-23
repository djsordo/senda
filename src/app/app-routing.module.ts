import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  },  {
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
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
