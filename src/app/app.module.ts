import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';
import { PopupComponent } from './popup/popup.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    HomeComponent,
    ErrorComponent,
    FaqComponent,
    AboutUsComponent,
  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CourseModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule {}
