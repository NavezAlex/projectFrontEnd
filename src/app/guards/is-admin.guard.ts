import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({
    providedIn: 'root'
  })
  export class IsAdminGuard implements CanActivate {
  
    constructor(private loginService: LoginService, private router : Router) { }
  
    async canActivate( route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) :  Promise<boolean> {
     
        //console.log(this.loginService.getConnectedUser());
        let result = false;
        await this.loginService.getConnectedUser().subscribe(
            user => {
                console.log(user);
                if(!user){
                    this.router.navigateByUrl('/home');
                    result = false;
                }else{
                    result = true;
                }
            }
        );
        
        return result;
    }
    
  }