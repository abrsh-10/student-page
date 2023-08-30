import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private languagesUrl =
    'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation';
  private audioLanguagesUrl = '../../../assets/languages.json';
  constructor(private http: HttpClient) {}

  protected getUrl(): string {
    return environment.courseMaterialApiUrl;
  }

  getLanguages(): Observable<any> {
    return this.http.get<any[]>(this.languagesUrl);
  }
  getAudioLanguages(): Observable<any> {
    return this.http.get<any[]>(this.audioLanguagesUrl);
  }
  translateText(text: string, to: string): Observable<string> {
    const url = `${this.getUrl()}/translate/${to}`;
    const requestBody = { text: text };

    return this.http.post<string>(url, requestBody);
  }
  summarizeText(text: string): Observable<string> {
    const url = `${this.getUrl}/summarize`;
    const requestBody = { text: text };
    return this.http.post<string>(url, requestBody);
  }
}
