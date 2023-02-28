import { Component } from '@angular/core';
import { Global } from 'app/services/global';
import { LoginService } from 'app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent {
  public url:string;
  username: string;
  password: string;

  constructor(private _loginService: LoginService) { 
    this.url=Global.url;
    this.username = "";
    this.password = "";
  }

  async onSubmit(){
    const url = "http://localhost:3600/login";
    const config: any = {
      method: "POST",
      body: {
        user: this.username ,
        password: this.password
      }
    }

    // const data = await fetch(url, config)
    
    // const { username, password} = await data.json as any

    const data = this._loginService.login(this.username, this.password)

    //Renderizar un componente o redirigir si es valido
    console.log(data)
  }
}
