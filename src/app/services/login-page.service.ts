import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserInfo } from '../shared/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiURL + '/users');
  }

  getUser(id: number) {
    return this.http.get(this.apiURL + '/users/' + id);
  }

  updateUser(user: UserInfo) {
    return this.http.put(this.apiURL + '/users/' + user.id, user);
  }

  createUser(data) {
    return this.http.post(this.apiURL + '/users', data);
  }
}
