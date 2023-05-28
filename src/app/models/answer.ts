export class Answer {
  answer!: string;
  questionNumber!: number;
  questionType!: string;
  constructor(questionType: string, questionNumber: number, answer: string) {
    this.questionType = questionType;
    this.questionNumber = questionNumber;
    this.answer = answer;
  }
}
