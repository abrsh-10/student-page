import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  showSideBar = true;
  courseId: any;
  course!: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(this.courseId).subscribe((data) => {
      this.course = data;
    });
  }
  changeRoute(route: string) {
    this.router.navigate([route]);
  }
  toogleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
}
