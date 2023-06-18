import { Injectable } from '@angular/core';
import { DataService } from '../service/DataService';
import { Faq } from '../models/faq';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqService extends DataService<Faq> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.faqApiUrl;
  }
  getFaqs(): Observable<Faq[]> {
    const url = `${this.getUrl()}/role/Student`;
    return this.getAll(url);
  }
}
