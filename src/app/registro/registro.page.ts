import { Usuario } from './../modelo/usuario';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario;
  correo = '';
  password = '';

  constructor(private location: Location) { }

  ngOnInit() {
  }

  navAtras(){
    this.location.back();
  }
}
