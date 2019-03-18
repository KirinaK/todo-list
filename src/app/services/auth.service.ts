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

  isLoggedIn(id: number): boolean {
    return +this.getToken() === id;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
