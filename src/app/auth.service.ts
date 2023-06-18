import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.userApiUrl;

  loginWithGoogle(idToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, idToken);
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem('email')) {
      return true;
    }
    return false;
  }
}
