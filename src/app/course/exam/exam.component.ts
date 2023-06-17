import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { ExamSolution } from 'src/app/models/exam-solution';
import { ExamSolutionService } from '../services/exam-solution.service';
import { PopupComponent, PopupData } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private examService: ExamService,
    private examSolutionService: ExamSolutionService,
    private dialog: MatDialog
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
          'abrhamsisay33@gmail.com'
        ); // create an instance of ExamSolution
        this.examSolutionService.postExamSolution(examSolution).subscribe(
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
    element.style.backgroundColor = '#e0dbdbe3';

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
}
