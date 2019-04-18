import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth/auth.service';
import { LoginPageService } from '../../shared/services/login/login-page.service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { UserInfo } from '../../shared/interfaces/user-info.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetForm = new FormGroup ({
    name: new FormControl(''),
    date: new FormControl(''),
    password: new FormControl('', Validators.minLength(3)),
    passwordRepeat: new FormControl('', Validators.minLength(3))
  });
  public isDateValid = true;
  public isUserExist = true;
  public isRepeat = false;
  public isEmpty = false;
  public isMatch = true;
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
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  public checkData(event: any): void {
    const name = this.resetForm.value.name;
    const date = this.resetForm.value.date;
    this.user = this.users.filter(user => user.name === name);
    this.isEmpty = (this.resetForm.untouched || !this.resetForm.dirty) ? true : false;
    this.isUserExist = (this.user.length === 0 && !this.isEmpty) ? false : true;
    if (!this.isEmpty) this.isDateValid = (!this.isUserExist || (this.isUserExist && (this.user[0].date === date))) ? true : false;
    if (!this.isUserExist) this.resetForm.reset();
    if (!this.isDateValid) this.resetForm.patchValue({date: ''});
    if (this.isUserExist && this.isDateValid && !this.isEmpty) {
      const passwordsForm = document.getElementsByClassName('reset__form-password');
      event.target.className = 'hide';
      passwordsForm[0].className = 'showForm';
    }
  }

  public changePassword(data: UserInfo): void {
    this.subscription = this.loginService.updateUser(data).subscribe(
      result => {
        this.auth.sendToken(data.id.toString());
        this.router.navigate(['home/' + data.id]);
      },
      error => this.logger.errorLog(error)
    );
  }

  public hideErrors(): void {
    this.isDateValid = true;
    this.isUserExist = true;
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
    if (!this.isMatch || !this.isRepeat) this.resetForm.patchValue({password: '', passwordRepeat: ''});
  }
}
