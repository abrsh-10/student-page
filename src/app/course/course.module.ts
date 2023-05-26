import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from '../navbar/navbar.component';
@NgModule({
  declarations: [CoursesComponent, NavbarComponent, CourseComponent],
  imports: [CommonModule, CourseRoutingModule],
  exports: [CoursesComponent],
})
export class CourseModule {}
