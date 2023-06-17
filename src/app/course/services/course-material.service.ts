import { Injectable } from '@angular/core';
import { DataService } from '../../service/DataService';
import { CourseMaterial } from '../../models/course-material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService extends DataService<CourseMaterial> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.courseMaterialApiUrl;
  }

  getCourseMaterial(id: string): Observable<CourseMaterial> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
}
