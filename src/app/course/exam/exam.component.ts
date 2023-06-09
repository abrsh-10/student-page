import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { ExamSolution } from 'src/app/models/exam-solution';
import { ExamSolutionService } from '../services/exam-solution.service';
import { PopupComponent, PopupData } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @Input() examId?: string;
  @Input() examDuration?: any;
  fullScreenMode: boolean = false;
  contentDiv!: any;
  examQuestions!: any;
  questions?: any[];
  currentPage!: number;
  answers: Answer[] = [];
  private timerCompleteEvents: number = 0;
  email?: string;

  constructor(
    private examService: ExamService,
    private examSolutionService: ExamSolutionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    const myElement = document.getElementById('fullscreen');
    if (myElement) {
      this.contentDiv = myElement;
      this.enterFullScreen(this.contentDiv);
    } else {
      // The element does not exist in the view
      console.log('Element not found');
    }
    this.currentPage = 1;
    this.examService.getQuestions(this.examId!).subscribe((data) => {
      this.examQuestions = data;
      this.loadQuestions();
    });
  }
  nextPage() {
    if (this.currentPage == 4) {
      this.currentPage++;
      this.questions = [];
      return;
    }
    this.currentPage++;
    this.loadQuestions();
  }
  loadQuestions() {
    this.questions = [];
    this.examQuestions.forEach((element: any) => {
      if (this.currentPage == 1 && element.questionType == 'True_False') {
        this.questions?.push(element);
      } else if (this.currentPage == 2 && element.questionType == 'Choose') {
        this.questions?.push(element);
      } else if (this.currentPage == 3 && element.questionType == 'Fill') {
        this.questions?.push(element);
      } else if (
        this.currentPage == 4 &&
        element.questionType == 'Short_Answer'
      ) {
        this.questions?.push(element);
      }
    });
  }
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
  saveAnswer(questionType: string, questionNumber: number, answer: string) {
    this.answers.forEach((answer) => {
      if (
        answer.questionNumber == questionNumber &&
        answer.questionType == questionType
      ) {
        this.answers.splice(this.answers.indexOf(answer), 1);
      }
    });
    const newAnswer = { questionType, questionNumber, answer };
    this.answers.push(newAnswer);
  }
  onSubmit(): void {
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      this.email = decryptedEmail;
    }
    this.exitFullScreen();
    const data: PopupData = {
      title: 'Submit Exam Solution',
      content: ['are you sure you have entered all answers for the exam'],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const examSolution: ExamSolution = new ExamSolution(
          this.answers,
          this.examId!,
          this.email!
        ); // create an instance of ExamSolution
        this.examSolutionService.postExamSolution(examSolution).subscribe(
          (result) => {
            this.showSnackbarAction(
              'your exam solution have been successfully recorded',
              'OK'
            );
          },
          (error) => {
            this.showSnackbarAction(
              'could not record your exam Solution',
              'OK'
            );
          }
        );
      } else {
        console.log('Dialog was closed');
        return;
      }
    });
    const currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  enterFullScreen(element: HTMLElement): void {
    this.fullScreenMode = true;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
    // Set background color to white
    element.style.backgroundColor = '#FFFFFF';

    // Add scrolling to the full screen
    element.style.overflow = 'auto';
  }

  private exitFullScreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
  onTimerComplete() {
    this.timerCompleteEvents++;
    if (this.timerCompleteEvents == 3) {
      const examSolution: ExamSolution = new ExamSolution(
        this.answers,
        this.examId!,
        this.email!
      ); // create an instance of ExamSolution
      this.examSolutionService.postExamSolution(examSolution).subscribe(
        (result) => {
          this.showSnackbarAction(
            'time ended but your exam solution until now have been successfully recorded',
            'OK'
          );
        },
        (error) => {
          this.showSnackbarAction('could not record your exam solution', 'OK');
        }
      );
      const currentUrl = this.route.url;
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate([currentUrl]);
      });
    }
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {});
    snack.onAction().subscribe(() => {});
  }
}
