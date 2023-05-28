import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @Input() examId?: String;
  examQuestions!: any;
  questions?: any[];
  currentPage!: number;
  answers: Answer[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
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
    console.log(this.answers);
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
}
