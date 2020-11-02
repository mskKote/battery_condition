import { ServerService } from './server.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  IsAuthored: boolean;
  constructor(private server: ServerService, private router: Router) {
    server.IsAuthored.subscribe((resp) => (this.IsAuthored = resp));
    let status = server.getUserStatus();
    this.server.IsAuthored.next(status);
  }
  canActivate() {
    // console.log('can activate says: ' + this.IsAuthored.valueOf());
    if (!this.IsAuthored.valueOf()) {
      this.router.navigate(['/auth']);
    }
    return this.IsAuthored;
  }
}
