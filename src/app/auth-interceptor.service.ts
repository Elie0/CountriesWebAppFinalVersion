import { Injectable } from '@angular/core';
import {
  HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request intercepted:', request);

    const token = localStorage.getItem('token');

    // Exclude login request from interceptor
    if (request.url.endsWith('/Login()')) {
      return next.handle(request);
    }

    if (token!=null) {
       request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },        
      })
      console.log('REQUESTT:' + request.headers)
    }
    console.log(token)

    console.log('Request headers after interceptor:', request);

    return next.handle(request);
  }
}