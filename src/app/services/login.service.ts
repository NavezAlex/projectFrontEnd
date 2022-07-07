import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _users : User[] = [
    {login : 'Admin', password : 'admin'}
  ]

  private _connectedUser : User | undefined;

  private currentUserSubject: BehaviorSubject<User|undefined>;
  public currentUser: Observable<User|undefined>;

  public isLogged : boolean = false;
  

  // userConnect : BehaviorSubject<User> = new BehaviorSubject<User>({
  //   login : '',
  //   password : ''
  // });

  constructor(private http: HttpClient, private router: Router) {
    let user : User | undefined = undefined;
    try {
      user = JSON.parse(sessionStorage.getItem('currentUser')??'undefined');
    } catch (error) {
      sessionStorage.clear();
    }
    if (user){
      this._connectedUser = this.check(user.login, user.password);
    }
    this.currentUserSubject = new BehaviorSubject<User|undefined>(this._connectedUser);
    this.currentUser = this.currentUserSubject.asObservable();


    this.isLogged = this.currentUserSubject.value ? true : false ; 
    
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
  }

  getConnectedUser(){
    return this.currentUserSubject.asObservable();
  }

  getConnected(){
    return this.currentUserSubject;
  }

  getLogged(){
    return this.isLogged;
  }

  check(login : string, password : string) {
    return this._users.find(user => user.login === login && user.password === password);
  }

  connexion(login : string, password : string) : User | undefined {
    this._connectedUser = this.check(login, password);
    if(!this._connectedUser){
      throw new Error("Erreur Pas D'Utilisateur");
    }
    sessionStorage.setItem('currentUser', JSON.stringify(this._connectedUser));
    this.currentUserSubject.next(this._connectedUser);

    this.isLogged = true;

    return this._users.find(user => user.login === login && user.password === password);
  }
  

  deconnexion() : undefined {
    this._connectedUser = undefined;
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
    this.isLogged = false;

    console.log("vous êtes déconnecté");

    this.router.navigate(['/home']);

    return undefined;
  }
}
