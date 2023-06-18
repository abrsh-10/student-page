export class Feedback {
  message!: string;
  sentBy!: string;
  constructor(message: string, sentBy: string) {
    this.message = message;
    this.sentBy = sentBy;
  }
}
