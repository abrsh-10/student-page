import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamSolution } from 'src/app/models/exam-solution';
import { DataService } from 'src/app/service/DataService';

@Injectable({
  providedIn: 'root',
})
export class ExamSolutionService extends DataService<ExamSolution> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return 'http://localhost:8085/api/exam-solution';
  }
  postExamSolution(examSolution: ExamSolution): Observable<ExamSolution> {
    const url = `${this.getUrl()}`;
    return this.add(url, examSolution);
  }
}
