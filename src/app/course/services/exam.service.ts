import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Exam } from '../models/exam';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends DataService<Exam> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return 'http://localhost:8085/api/exam';
  }
  getExams(id: String): Observable<Exam> {
    const url = `${this.getUrl()}/course-id`;
    return this.getById(url, id);
  }
  getQuestions(id: string): Observable<Question> {
    const url = `${this.getUrl()}/questions`;
    return this.getById(url, id);
  }
}
