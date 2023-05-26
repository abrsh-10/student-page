import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent {
  constructor(private router: Router) {}
  changeRoute(examid: string) {
    this.router.navigate(['/course', examid]);
  }
}
