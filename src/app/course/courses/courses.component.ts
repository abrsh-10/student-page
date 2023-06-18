import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses!: any[];
  email: any;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    this.userService.getByEmail(this.email).subscribe((data) => {
      this.courseService.getCourses(data.courses!).subscribe((courses) => {
        this.courses = courses;
      });
    });
  }

  onSelectCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
