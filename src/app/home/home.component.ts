import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user?: SocialUser;

  constructor(private authService: SocialAuthService, private router: Router) {}
  login() {
    const link = document.getElementById('google_login');
    console.log(link);
    link!.click();
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
      this.router.navigate(['/home']);
    });
  }
}
