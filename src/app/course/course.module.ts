import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';

const routes = [{ path: '', component: CoursesComponent }];
@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent],
})
export class CourseModule {}
