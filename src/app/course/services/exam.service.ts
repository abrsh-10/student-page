import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Exam } from '../models/exam';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
