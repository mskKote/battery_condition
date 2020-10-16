import { ServerService } from './server.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public server: ServerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
// console.log("mew"+request.url+
// this.server.IsAuthored.getValue());
    if (this.server.getJwtToken()) {
      if(this.server.IsAuthored.getValue()==false){
        this.handle401Error(request,next);
      }
      request = this.addToken(request, this.server.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.server.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          this.server.IsAuthored.next(true);
          return next.handle(this.addToken(request, token.jwt));
        }),
        catchError((err) => {
          console.log('h401E catch err >> ', err);
          return of(null);
        })
      );
    } else {
      // console.log('isRefreshing >> ', this.isRefreshing);
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
