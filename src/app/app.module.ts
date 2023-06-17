import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';
import { FooterComponent } from './footer/footer.component';
import { PopupComponent } from './popup/popup.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PopupComponent,
    HomeComponent,
    ErrorComponent,
  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CourseModule,
    MatDialogModule,
    MatIconModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '159479957223-qka39ssrtraeilbuhv0a5r07sn43oemq.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err: any) => {
          console.log('err');
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule {}
