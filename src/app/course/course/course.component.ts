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
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { PopupComponent, PopupData } from 'src/app/popup/popup.component';
import { Assignments } from 'src/app/models/assignments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [DatePipe],
})
export class CourseComponent implements OnInit {
  showSideBar = true;
  email!: string;
  courseId: any;
  course: Course = new Course();
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.email = sessionStorage.getItem('email')!;
    this.courseService.getCourse(this.courseId).subscribe((data) => {
      this.course = data;
    });
    this.courseMaterialService
      .getCourseMaterial(this.courseId)
      .subscribe((data) => {
        this.courseMaterials = data;
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
      //calculate the remaining duration
      this.examDuration =
        this.getRemainingMinutes(exam?.startTime!, exam?.duration!) * 60;
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
  showUploadForm(assignment?: any) {
    const data: FormData = {
      title: 'Upload Solution Form',
      assignments: assignment || this.assignments,
      fileIncluded: true,
      positiveButton: 'Upload',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentSolutionService
          .getAssignmentSolution('abrhamsisay33@gmail.com')
          .subscribe((data) => {
            for (let solution of data) {
              if (solution.assignmentId == result.assignmentId) {
                const data: PopupData = {
                  title: 'Error',
                  content: [
                    'assignment solution already exists for this assignment',
                  ],
                  positiveButton: 'close',
                };
                const dialogRef = this.dialog.open(PopupComponent, { data });
                return;
              }
            }
            this.assignmentSolutionService
              .postAssignmentSolution(result)
              .subscribe(
                (result) => {
                  // handle the successful response
                  console.log('Exam solution submitted successfully:', result);
                },
                (error) => {
                  // handle the error response
                  console.error('Failed to submit exam solution:', error);
                }
              );
          });
      } else {
        return;
      }
    });
  }
  viewSolution(assignment: any) {
    this.assignmentSolutionService
      .getAssignmentSolution(this.email)
      .subscribe((data) => {
        let solution: any;
        data.forEach((item) => {
          if (item.assignmentId == assignment.assignmentId) {
            solution = item;
          }
        });
        if (solution) {
          const data: PopupData = {
            title: 'Assignment Solution',
            content: [
              'Solution Name: ' + solution.assignmentSolutionName,
              'Solution Size: ' +
                this.bytesToMegabytes(solution.assignmentSolutionSize, 2) +
                'MB',
              'Solution description: ' + solution.assignmentSolutionDescription,
            ],
            positiveButton: 'delete',
            negativeButton: 'close',
          };
          const dialogRef = this.dialog.open(PopupComponent, { data });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              const data: PopupData = {
                title: 'Delete Assignment Solution',
                content: ['Are you sure to delete the assignment solution'],
                positiveButton: 'Yes',
                negativeButton: 'No',
              };
              const dialogRef = this.dialog.open(PopupComponent, { data });
              dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                  this.assignmentSolutionService
                    .deleteAssignmentSolution(solution.assignmentSolutionId)
                    .subscribe();
                } else {
                  return;
                }
              });
            } else {
              return;
            }
          });
        } else {
          const data: PopupData = {
            title: 'Assignment Solution',
            content: ['you have not added any solution to this assignment yet'],
            positiveButton: 'upload',
            negativeButton: 'close',
          };
          const dialogRef = this.dialog.open(PopupComponent, { data });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.showUploadForm([assignment]);
            } else {
              return;
            }
          });
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
  bytesToMegabytes(bytes: number, decimalPlaces: number): number {
    const megabytes = bytes / (1024 * 1024);
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(megabytes * factor) / factor;
  }
  formatDate(dateString: string): string {
    const dateTimeParts = dateString.split('T');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-indexed
    const day = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    const date = new Date(year, month, day, hours, minutes);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for display
    const timeSuffix = hours < 12 ? 'am' : 'pm'; // Determine time suffix
    const formattedDate = `${monthName} ${date.getDate()} ${date.getFullYear()} @ ${formattedHours}:${this.formatMinutes(
      date.getMinutes()
    )} ${timeSuffix}`;

    return formattedDate;
  }

  formatMinutes(minutes: number): string {
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes.toString();
  }
  expand(exam: Exam) {
    exam.expanded = !exam.expanded;
  }
  getRemainingMinutes(dateString: string, minutesToAdd: number): number {
    const inputDate = new Date(dateString);
    const targetDate = new Date(inputDate.getTime() + minutesToAdd * 60 * 1000); // Add minutes to input date
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const minutesDifference = timeDifference / (60 * 1000); // Convert milliseconds to minutes and round up
    return minutesDifference;
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {});
    snack.onAction().subscribe(() => {});
  }
}
