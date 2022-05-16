import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario= {
    email: '',
    password: ''
  };

  constructor(private menu: MenuController, private loginService: LoginService) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  login(){
    this.loginService.comprobarLogin(this.usuario);
  }
}
