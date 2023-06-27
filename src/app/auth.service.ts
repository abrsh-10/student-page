import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

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
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      console.log(decryptedEmail);
      if (decryptedEmail) {
        return true;
      }
    } else {
      return false;
    }
    return false;
  }
}
