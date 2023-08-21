import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';

import { environment } from './../../environments/environment';
import { AuthenticationService } from '../core/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // add auth header with jwt if user is logged in and request is to the api url
        // const token = JSON.parse(window.localStorage.getItem("token"));
        // this.spinner.show();
        const token = window.localStorage.getItem("token")
        const isApiUrl = request.url.startsWith(`${environment.apiURL}`);
        if (token && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logout();
            }

            const error = err.error.error?.message || err.error.error;
            return throwError(error);
            }),
            finalize(() => {
                // this.spinner.hide(); // Hide the spinner when the request is complete (success or error)
            })
        );
    }
}