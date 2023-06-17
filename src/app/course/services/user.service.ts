import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { DataService } from 'src/app/service/DataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.userApiUrl;
  }
  getByEmail(email: String): Observable<User> {
    const url = `${this.getUrl()}/email`;
    return this.getById(url, email);
  }
  getLoggedInEmail(): Observable<any> {
    const url = `${this.getUrl()}/log-in-email`;
    return this.get(url);
  }
}
