import { Usuario } from './../modelo/usuario';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario = this.usuarioService.newUsuario();
  password = '';
  password2 = '';

  constructor(private location: Location,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  navAtras(){
    this.location.back();
  }
}
