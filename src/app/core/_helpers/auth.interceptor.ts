import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

// Just adds the token if we have one, otherwise pass the request on without one
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.currentUserValue?.token;
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
