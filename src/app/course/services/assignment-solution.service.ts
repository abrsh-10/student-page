import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { DataService } from 'src/app/service/DataService';

@Injectable({
  providedIn: 'root',
})
export class AssignmentSolutionService extends DataService<FormData> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return 'http://localhost:8085/api/assignment-solution';
  }
  postExamSolution(
    assignmentSolution: AssignmentSolution
  ): Observable<FormData> {
    const formData = new FormData();
    formData.append(
      'file',
      assignmentSolution.file,
      assignmentSolution.file.name
    );
    formData.append('uploader', assignmentSolution.uploader);
    formData.append('description', assignmentSolution.description!);
    formData.append('assignment_id', assignmentSolution.assignmentId);
    const url = `${this.getUrl()}`;
    return this.add(url, formData);
  }
}
