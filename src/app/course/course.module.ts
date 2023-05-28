import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ExamComponent } from './exam/exam.component';
@NgModule({
  declarations: [CoursesComponent, NavbarComponent, CourseComponent, ExamComponent],
  imports: [CommonModule, CourseRoutingModule],
  exports: [CoursesComponent],
})
export class CourseModule {}
