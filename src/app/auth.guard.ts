import { ServerService } from './server.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private server: ServerService,private router: Router){ }
  canActivate(){
   if(this.server.isLoggedIn()){
     this.router.navigate(['/auth']);
   }
   return !this.server.isLoggedIn();}
  }


