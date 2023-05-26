import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamsComponent } from './exams/exams.component';

const routes: Routes = [
  { path: 'course/:id/exams', component: ExamsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
