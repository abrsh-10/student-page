import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth-guard';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'error', pathMatch: 'full', component: ErrorComponent },
  {
    path: 'courses',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
    canActivate: [AuthGuard],
  },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'contact', pathMatch: 'full', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
