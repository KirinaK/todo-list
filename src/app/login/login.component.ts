import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth/auth.service';
import { LoginPageService } from '../shared/services/login/login-page.service';
import { LoggingService } from '../shared/services/logging/logging.service';
import { UserInfo } from '../shared/interfaces/user-info.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });
  public isUserExist = true;
  public isValid = true;
  public isEmpty = false;
  private id: number;
  private users: any = [];
  private subscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private logger: LoggingService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  public login(): void {
    const name = this.loginForm.value.name;
    const password = this.loginForm.value.password;
    const userInfo = this.users.filter(user => user.name === name);
    this.isEmpty = (this.loginForm.untouched || !this.loginForm.dirty) ? true : false;
    if (this.checkData(userInfo) && this.checkPassword(userInfo, password) && !this.isEmpty) {
      this.users.forEach(user => {
        (user.name === name && user.password === password) ? this.id = user.id : null;
      });
      this.auth.sendToken(this.id.toString());
      this.router.navigate(['home/' + this.id]);
    }
    if (!this.isEmpty && !this.isValid) this.loginForm.patchValue({password: ''});
    if (!this.isUserExist) this.loginForm.reset();
  }

  public hideErrors() {
    this.isUserExist = true;
    this.isValid = true;
    this.isEmpty = false;
  }

  private getUsers(): void {
    this.subscription = this.loginService.getAllUsers().subscribe(
      result => this.users = result,
      error => this.logger.errorLog(error)
    );
  }

  private checkData(user: any): boolean {
    if (!this.isEmpty) return this.isUserExist = (user.length === 1) ? true : false;
  }

  private checkPassword(user: UserInfo, password: string): boolean {
    if (!this.isEmpty) return this.isValid = (user[0].password === password) ? true : false;
  }
}
