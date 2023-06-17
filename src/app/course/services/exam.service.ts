import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Exam } from '../../models/exam';
import { Observable } from 'rxjs';
import { Question } from '../../models/question';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends DataService<Exam> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.examApiUrl;
  }
  getExams(id: string): Observable<Exam> {
    const url = `${this.getUrl()}/course-id`;
    return this.getById(url, id);
  }
  getQuestions(id: String): Observable<Question> {
    const url = `${this.getUrl()}/questions`;
    return this.getById(url, id);
  }
}
