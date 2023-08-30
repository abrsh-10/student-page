import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/DataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.audioTranscribeUrl;
  }
  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.getUrl()}`;
    return this.add(url, formData);
  }
}
