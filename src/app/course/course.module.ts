import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CdTimerModule } from 'angular-cd-timer';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ExamComponent } from './exam/exam.component';
import { TimerComponent } from './timer/timer.component';
@NgModule({
  declarations: [
    CoursesComponent,
    NavbarComponent,
    CourseComponent,
    ExamComponent,
    TimerComponent,
  ],
  imports: [CommonModule, CourseRoutingModule, CdTimerModule],
  exports: [CoursesComponent],
})
export class CourseModule {}
