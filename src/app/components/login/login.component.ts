import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connectedUser : User | undefined = undefined;

  isConnected : boolean | undefined;

  pseudo : string = '';
  password : string = '';
  hide = true;

  constructor(private _loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  
  login()
  {
    this.connectedUser = this._loginService.connexion(this.pseudo, this.password);
    if(this.connectedUser)
    {
      console.log("Connecté");
      this.router.navigate(['/admin']);
    }
    else{
      console.log("erreur");
    }
  }

  logout(){
    this.connectedUser = this._loginService.deconnexion();
  }
}
