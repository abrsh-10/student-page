import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';
import { FooterComponent } from './footer/footer.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, PopupComponent],

  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CourseModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule {}
