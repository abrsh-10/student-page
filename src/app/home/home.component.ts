import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    const loginFunction = this.login.bind(this);
    (window as any).getToken = function (response: any) {
      loginFunction(response.credential);
    };
  }

  login(token: string) {
    this.authService.loginWithGoogle(token).subscribe(
      (response) => {
        if (response.email && response.role == 'Student') {
          this.encryptAndStoreEmail(response.email);
          this.router.navigate(['/courses']);
        } else {
          this.router.navigate(['/error']);
        }
      },
      (error) => {
        console.error('Error:', error);
        this.router.navigate(['/error']);
      }
    );
  }
  toCourses() {
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      console.log(decryptedEmail);
      if (decryptedEmail) {
        this.router.navigate(['/courses']);
        return;
      }
    } else {
      alert('need to login first');
      return;
    }
    alert('please login first');
  }
  encryptAndStoreEmail(email: string): void {
    const encryptedEmail = CryptoJS.AES.encrypt(
      email,
      environment.jwtSecret
    ).toString();
    sessionStorage.setItem('token', encryptedEmail);
  }
}
