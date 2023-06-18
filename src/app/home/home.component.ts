import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
        console.log('Response:', response);
        if (response.email) {
          sessionStorage.setItem('email', response.email);
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
    if (sessionStorage.getItem('email')) {
      this.router.navigate(['/courses']);
    } else {
      alert('please login first');
    }
  }
}
