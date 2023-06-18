import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import { DataService } from '../service/DataService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends DataService<Feedback> {
  constructor(http: HttpClient) {
    super(http);
  }
  protected getUrl(): string {
    return environment.feedbackApiUrl;
  }
  postFeedback(feedback: Feedback): Observable<Feedback> {
    const url = `${this.getUrl()}`;
    return this.add(url, feedback);
  }
}
