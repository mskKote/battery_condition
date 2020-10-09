import { ServerService } from './server.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  IsAuthored:boolean;
  constructor(private server: ServerService,private router: Router){
    server.IsAuthored.subscribe((resp)=>this.IsAuthored = resp);
   }
  canActivate(){

    console.log("can activate says: "+ this.IsAuthored.valueOf());
   if(!this.IsAuthored.valueOf()){
     this.router.navigate(['/auth']);
   }
   return this.IsAuthored;}
  }


