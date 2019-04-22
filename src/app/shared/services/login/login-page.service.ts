import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UserInfo } from '../../interfaces/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Object> {
    return this.http.get(this.apiURL + '/users');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users/' + id);
  }

  updateUser(user: UserInfo): Observable<Object> {
    return this.http.put(this.apiURL + '/users/' + user.id, user);
  }

  createUser(data: UserInfo): Observable<Object> {
    return this.http.post(this.apiURL + '/users', data);
  }
}
