import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiURL + '/users');
  }

  getUser(id) {
    return this.http.get(this.apiURL + '/users' + id);
  }

  createUser(data) {
    return this.http.post(this.apiURL + '/users', data);
  }
}
