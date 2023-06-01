import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../../models/course';
import { CourseMaterialService } from '../services/course-material.service';
import { TopicService } from '../services/topic.service';
import { LessonService } from '../services/lesson.service';
import { Topic } from '../../models/topic';
import { ExamService } from '../services/exam.service';
import { DatePipe } from '@angular/common';
import { AssignmentService } from '../services/assignment.service';
import { Exam } from '../../models/exam';
import { FormComponent, FormData } from 'src/app/course/form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentSolutionService } from '../services/assignment-solution.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [DatePipe],
})
export class CourseComponent implements OnInit {
  showSideBar = true;
  courseId: any;
  course!: Course;
  showCourseMaterial = true;
  showTopic = false;
  showLesson = false;
  showExam = false;
  showAssignment = false;
  showQuestion? = false;
  showVideo? = false;
  courseMaterials?: any;
  topics?: any;
  topicTitle?: string;
  topicDescription?: string;
  lessons?: any;
  exams?: any;
  assignments?: any;
  examQuestions?: any;

  questions?: any[];
  examId?: string;
  examDuration?: number;
  examActiveStatus?: boolean;
  currentPage = 0;
  questionsPerPage = 4;

  videoId?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseMaterialService: CourseMaterialService,
    private topicService: TopicService,
    private lessonService: LessonService,
    private examService: ExamService,
    private assignmentService: AssignmentService,
    private assignmentSolutionService: AssignmentSolutionService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(this.courseId).subscribe((data) => {
      this.course = data;
      this.courseMaterialService
        .getCourseMaterial(this.courseId)
        .subscribe((data) => {
          this.courseMaterials = data;
        });
    });
  }
  changeRoute(route: string) {
    this.router.navigate([route]);
  }
  toogleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
  toogleSideBarItems(position: Number, topic?: Topic, exam?: Exam) {
    if (position == 1) {
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showCourseMaterial = !this.showCourseMaterial;
      this.courseMaterialService
        .getCourseMaterial(this.courseId)
        .subscribe((data) => {
          this.courseMaterials = data;
        });
    } else if (position == 2) {
      this.showCourseMaterial = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showTopic = !this.showTopic;
      this.topicService.getTopics(this.courseId).subscribe((data) => {
        this.topics = data;
      });
    } else if (position == 3) {
      this.showCourseMaterial = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showLesson = true;
      this.topicTitle = topic?.topicTitle;
      this.topicDescription = topic?.topicDescription;
      this.lessonService.getLessons(topic?.topicId).subscribe((data) => {
        this.lessons = data;
      });
    } else if (position == 4) {
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showExam = !this.showExam;
      this.examService.getExams(this.courseId).subscribe((data) => {
        this.examQuestions = data;
      });
    } else if (position == 5) {
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignment = !this.showAssignment;
      this.assignmentService.getAssignments(this.courseId).subscribe((data) => {
        this.assignments = data;
      });
    } else if (position == 6) {
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showVideo = false;
      this.showQuestion = true;
      this.examId = exam!.examId;
      this.examActiveStatus = exam!.active;
      this.examDuration = exam!.duration * 60;
    }
  }
  activateVideo(videoId: string) {
    this.showCourseMaterial = false;
    this.showTopic = false;
    this.showLesson = false;
    this.showExam = false;
    this.showAssignment = false;
    this.showQuestion = false;
    this.showVideo = true;
    this.videoId = videoId;
  }
  showUploadForm() {
    const data: FormData = {
      title: 'Upload Solution Form',
      assignments: this.assignments,
      fileIncluded: true,
      positiveButton: 'Upload',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentSolutionService.postExamSolution(result).subscribe(
          (result) => {
            // handle the successful response
            console.log('Exam solution submitted successfully:', result);
          },
          (error) => {
            // handle the error response
            console.error('Failed to submit exam solution:', error);
          }
        );
      } else {
        console.log('Dialog was closed');

        return;
      }
    });
  }
  downloadFile(id: string, fileName: string) {
    this.courseMaterialService.downloadFile(id).subscribe((data: Blob) => {
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
    });
  }
}
