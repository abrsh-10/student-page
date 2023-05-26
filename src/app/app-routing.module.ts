import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseRoutingModule } from './course/course-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), CourseRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
