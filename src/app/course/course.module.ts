import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CdTimerModule } from 'angular-cd-timer';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ExamComponent } from './exam/exam.component';
import { VideoComponent } from './video/video.component';
import { FormComponent } from './form/form.component';
@NgModule({
  declarations: [
    CoursesComponent,
    NavbarComponent,
    CourseComponent,
    ExamComponent,
    VideoComponent,
    FormComponent,
  ],
  imports: [CommonModule, CourseRoutingModule, CdTimerModule, FormsModule],
  exports: [CoursesComponent],
})
export class CourseModule {}
