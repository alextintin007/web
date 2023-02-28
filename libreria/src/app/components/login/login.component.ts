import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  async onSubmit(){
    const url = "http://localhost:3600/login";
    const config: any = {
      method: "POST",
      body: {
        user: this.username ,
        password: this.password
      }
    }

    const data = await fetch(url, config)
    
    const { username, password} = await data.json as any

    console.log(username)
  }
}
