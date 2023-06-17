import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Assignments } from '../../models/assignments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AssignmentService extends DataService<Assignments> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.assignmentApiUrl;
  }
  getAssignments(id: String): Observable<Assignments> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
}
