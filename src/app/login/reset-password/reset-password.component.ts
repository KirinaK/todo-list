import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth/auth.service';
import { LoginPageService } from '../../shared/services/login/login-page.service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { loginAsyncValidator } from '../user.validator';
import { UserInfo } from '../../shared/interfaces/user-info.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetForm: FormGroup;
  public isDateValid = true;
  public isUserExist = true;
  public isRepeat = false;
  public isEmpty = false;
  public isMatch = true;
  public showForm = false;
  private subscription: Subscription;
  private users: any = [];
  private user: any;

  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private logger: LoggingService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  checkData(event: any): void {
    const { name, date } = this.resetForm.value;
    this.user = this.users.filter(user => user.name === name);
    this.isEmpty = (this.resetForm.untouched || !this.resetForm.dirty) ? true : false;
    this.resetDate(date);
    if (this.isDateValid && !this.isEmpty) {
      this.showForm = true;
      event.target.className = 'hide';
    }
  }

  changePassword(data: UserInfo): void {
    this.subscription = this.loginService.updateUser(data).subscribe(
      result => {
        this.auth.sendToken(data.id.toString());
        this.router.navigate(['home/' + data.id]);
      },
      error => this.logger.errorLog(error)
    );
  }

  isLoginExist(): boolean {
    return this.resetForm.dirty && this.resetForm.get('name').hasError('loginExist');
  }

  initForm(): void {
    this.resetForm = new FormGroup ({
      name: new FormControl('', Validators.required, loginAsyncValidator(this.loginService)),
      date: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  hideErrors(): void {
    this.isDateValid = true;
    this.isEmpty = false;
    this.isRepeat = false;
    this.isMatch = true;
  }

  private getUsers(): void {
    this.subscription = this.loginService.getAllUsers().subscribe(
      result => this.users = result,
      error => this.logger.errorLog(error)
    );
  }

  private isMatchPasswords(): void {
    const lastPassword = this.user[0].password;
    const password = this.resetForm.value.password;
    const passwordRepeat = this.resetForm.value.passwordRepeat;
    this.isMatch = (password !== passwordRepeat) ? false : true;
    this.isRepeat = (password === lastPassword) ? true : false;
    if (this.isMatch && !this.isRepeat) {
      this.user[0].password = password;
      this.changePassword(this.user[0]);
    }
    this.resetPasswords();
  }

  private resetDate(date): void {
    if (!this.isEmpty) {
      this.isDateValid = (this.isLoginExist() && (this.user[0].date === date)) ? true : false;
      if (!this.isDateValid) {
        this.resetForm.patchValue({date: ''});
      }
    }
  }

  private resetPasswords(): void {
    if (!this.isMatch || !this.isRepeat) {
      this.resetForm.patchValue({password: '', passwordRepeat: ''})
    }
  }
}
