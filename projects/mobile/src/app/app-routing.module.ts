import { NgModule } from '@angular/core';
import { PreloadAllModules,
          RouterModule,
          Routes } from '@angular/router';
import { permissionsGuard } from './services/security.service';


export interface MenuEntry {
  title: string, 
  url? : string, 
  icon? : string, 
  src? : string,
  allowedRoles :  string[], 
  showDetails? : boolean,
  submenu? : MenuEntry[]
};

export let appMenu : MenuEntry[] = [
  { title: 'Home',
    url: '/home',
    icon: 'home', 
    allowedRoles: ['*']
  },
  {
    title: 'Datos', 
    url: '/estadisticas', 
    src: 'assets/estadisticas.svg', 
    allowedRoles: ['admin', 'delegado']
  },
  { title: 'Admin',
    url: '/admin/home',
    icon: 'cog',
    allowedRoles : ['admin'],
    showDetails: false,
    submenu : [
      { title : 'Clubes',
        url: '/admin/clubes',
        icon: 'folder-open', 
        allowedRoles: ['admin'] },
      { title : 'Equipos',
        url : '/admin/equipos',
        src : 'assets/team.svg', 
        allowedRoles: ['admin'] },
      { title: 'Jugadores', 
        url: '/admin/jugadores', 
        icon: 'people', 
        allowedRoles: ['admin'] },
      { title : 'Usuarios',
        url : '/admin/usuarios',
        icon : 'person', 
        allowedRoles: ['admin'] },
      { title : 'Partidos',
        url : '/admin/partidos',
        src : 'assets/handball.svg', 
        allowedRoles: ['admin'] }
    ]}
];


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    /* login debe ser pública; aquí no hay permissionsGuard */
  },
  {
    path: 'modo-jugador',
    loadChildren: () => import('./modo-jugador/modo-jugador.module').then( m => m.ModoJugadorPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'modo-accion',
    loadChildren: () => import('./modo-accion/modo-accion.module').then( m => m.ModoAccionPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'detalle-jugador',
    loadChildren: () => import('./detalle-jugador/detalle-jugador.module').then( m => m.DetalleJugadorPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'inicio-sel-jugadores',
    loadChildren: () => import('./inicio-sel-jugadores/inicio-sel-jugadores.module').then( m => m.InicioSelJugadoresPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'microfono',
    loadChildren: () => import('./microfono/microfono.module').then( m => m.MicrofonoPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'modo-ver',
    loadChildren: () => import('./modo-ver/modo-ver.module').then( m => m.ModoVerPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'listas-estad',
    loadChildren: () => import('./listas-estad/listas-estad.module').then( m => m.ListasEstadPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin/home/admin-home.module').then( m => m.AdminHomePageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/home/home.module').then( m => m.EstadisticasPageModule),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin/clubes',
    loadChildren: () => import('./admin/clubes/admin-clubes.module').then( m => m.AdminClubesPageModule ),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin/equipos',
    loadChildren: () => import('./admin/equipos/admin-equipos.module').then( m => m.AdminEquiposPageModule ),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin/usuarios',
    loadChildren: () => import('./admin/usuarios/admin-usuarios.module').then( m => m.AdminUsuariosModule ),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin/jugadores', 
    loadChildren: () => import('./admin/jugadores/admin-jugadores.module').then( m => m.AdminJugadoresModule ),
    canActivate: [ permissionsGuard ]
  },
  {
    path: 'admin/partidos',
    loadChildren: () => import('./admin/partidos/admin-partidos.module').then( m => m.AdminPartidosPageModule ),
    canActivate: [ permissionsGuard ]
  },
  /*
   * Requisitos legales y del regulador
   * (agencia de protección de datos, fiscales, etc.)
   */
  {
    path : 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyModule )
    /* ruta pública; aquí no hay permissionsGuard */
  },
  {
    path: 'user-settings', 
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsModule )
  },
  {
    path: 'share',
    loadChildren: () => import('./share/share.module').then( m => m.SharePageModule )
    /* ruta pública; aquí no hay permissionsGuard */
  },
  {
    path: 'estad-jugador',
    loadChildren: () => import('./estad-jugador/estad-jugador.module').then( m => m.EstadJugadorPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
    /* ruta pública; aquí no hay permissionsGuard */
  },
  {
    path: 'add-to-home',
    loadChildren: () => import('./add-to-home/add-to-home.module').then( m => m.AddToHomePageModule)
    /* ruta pública; aquí no hay permissionsGuard */
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
