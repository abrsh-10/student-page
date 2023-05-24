import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],

  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CourseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
