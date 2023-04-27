import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenn: string | null = null;
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.tokenn !== null;
  }

  login(username: string, password: string) {
    const url = 'http://173.249.40.235:5005/api/User/Login()';
    const body = { username, password };
  
    return this.http.post(url, body).pipe(
      tap(response => console.log('Response:', response)),
      map((response:any) => response.Login.AccessToken),
      tap(token=>this.tokenn=token),
      tap(token => localStorage.setItem('AccessTtoken', token)),
      catchError(error => {
        console.log('Error:', error.message);
        throw error;
      })
    );
  }
}

