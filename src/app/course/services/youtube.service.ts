import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/DataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.youtubeApiUrl;
  }

  getTranscribedText(videoId: any): Observable<any> {
    const url = `${this.getUrl()}/${videoId}`;
    return this.add(url, null);
  }
}
