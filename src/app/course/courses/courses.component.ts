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
  courseIds: String[] = [
    '645fd39d922399163eaf8a94',
    '645fde09922399163eaf8a95',
    '645fde94922399163eaf8a96',
    '645fdfa3922399163eaf8a97',
    '645fe069922399163eaf8a98',
    '645fe0f6922399163eaf8a99',
  ];
  email: any;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('email') != 'all') {
      sessionStorage.setItem(
        'email',
        this.route.snapshot.paramMap.get('email')!
      );
    }
    this.email = sessionStorage.getItem('email');
    this.location.replaceState('/courses/all');
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
