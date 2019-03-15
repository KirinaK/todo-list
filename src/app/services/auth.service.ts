import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  sendToken(token: string): void {
    localStorage.setItem('LoggedInUser', token);
  }

  getToken(): string {
    return localStorage.getItem('LoggedInUser');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
