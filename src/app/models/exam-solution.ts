import { Answer } from './answer';

export class ExamSolution {
  answers!: Answer[];
  examId!: String;
  studentEmail!: string;
  constructor(answers: Answer[], examId: string, studentEmail: string) {
    this.answers = answers;
    this.examId = examId;
    this.studentEmail = studentEmail;
  }
}
