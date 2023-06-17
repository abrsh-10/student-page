import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { DataService } from 'src/app/service/DataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentSolutionService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.assignmentSolutionApiUrl;
  }
  postAssignmentSolution(
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
  getAssignmentSolution(uploader: string): Observable<any[]> {
    const url = `${this.getUrl()}/uploader`;
    return this.getById(url, uploader);
  }
  deleteAssignmentSolution(id: string): Observable<any> {
    const url = `${this.getUrl()}/delete`;
    return this.delete(url, id);
  }
}
