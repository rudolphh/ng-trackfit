import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403) {
                // auto logout if 403 response returned from api
                this.authService.logout();
                location.reload();
            }

            // Log the entire error object to inspect its structure
            console.error('Error object:', err);
            console.log('Error object:', err);

            let errorMsg = '';
            if (err.error instanceof ErrorEvent) {
              console.log('this is client side error');
              errorMsg = `Error: ${err.error.message}`;
            }
            else {
              console.log('this is server side error');
              console.log(err);
              errorMsg = `Error Code: ${err.status},  Message: ${err.error?.message}`;
            }
            console.log(errorMsg);


            return throwError(errorMsg);
        }));
    }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
