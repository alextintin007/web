import { Component } from '@angular/core';
import { Global } from 'app/services/global';
import { LoginService } from 'app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  public url: string;
  username: string;
  password: string;
  isAuth: boolean;

  constructor(private _loginService: LoginService) {
    this.url = Global.url;
    this.username = "";
    this.password = "";
    this.isAuth = false;
  }

  async onSubmit() {
    if (this.isAuth) {
      alert("El usuario ya se encuentra logeado")
      return
    }
    const data = this._loginService.login(this.username, this.password).subscribe(
      data => {
        const { user } = data
        if (!user) {
          alert("Credenciales inválidas")
          return
        }

        this.isAuth = true;
        alert(`Usuario autenticado! Bienvenido ${user}`)
      }
    )
  }

  logout() {
    this.isAuth = false;
    alert("Sesión Cerrada")
  }

}
