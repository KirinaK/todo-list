import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth/auth.service';
import { LoginPageService } from '../../shared/services/login/login-page.service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { regDate } from '../../shared/constants/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public currentDate: string;
  public registrationForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.minLength(3)),
    passwordRepeat: new FormControl('', Validators.minLength(3)),
    date: new FormControl(''),
    about: new FormControl(''),
    photo: new FormControl('')
  });
  public isMatch = true;
  public isRight = true;
  public isUserExist = false;
  private id: number;
  private users: any = [];
  private subsctiption: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private logger: LoggingService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getCurrentDate();
    this.getUsers();
  }

  ngOnDestroy() {
    this.subsctiption && this.subsctiption.unsubscribe();
  }

  public signUp(): void {
    const name = this.registrationForm.value.name;
    const date = this.registrationForm.value.date;
    const password = this.registrationForm.value.password;
    const passwordRepeat = this.registrationForm.value.passwordRepeat;
    this.checkBirth(date);
    this.checkData(name, password);
    this.matchPasswords(password, passwordRepeat);
    if (!this.isUserExist && this.isMatch && this.isRight) {
      this.users.filter(user => {
        let lastId = (user.id === this.users.length) ? user.id : null;
        this.registrationForm.controls['id'].setValue(++lastId);
        this.id = this.registrationForm.controls['id'].value;
      });
      this.auth.sendToken(this.id.toString());
      this.registrationForm.removeControl('passwordRepeat');
      this.registrationForm.updateValueAndValidity();
      this.loginService.createUser(this.registrationForm.value).subscribe();
      this.router.navigate(['/home/' + this.registrationForm.value.id]);
    }
    if (!this.isUserExist && !this.isMatch) this.registrationForm.patchValue({password: '', passwordRepeat: ''});
    if (!this.isRight) this.registrationForm.patchValue({date: '', password: '', passwordRepeat: ''});
    if (this.isUserExist) this.registrationForm.reset();
  }

  public hideErrors(): void {
    this.isUserExist = false;
    this.isMatch = true;
    this.isRight = true;
  }

  public autosize(event: any): void {
    setTimeout(function() {
      event.target.style.cssText = 'height: auto; padding: 0';
      event.target.style.cssText = 'height:' + event.target.scrollHeight + 'px';
    }, 0);
  }

  private getUsers(): void {
    this.subsctiption = this.loginService.getAllUsers().subscribe(
      result => this.users = result,
      error => this.logger.errorLog(error)
    );
  }

  private getCurrentDate(): void {
    const date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
    document.getElementById('date').setAttribute('max', this.currentDate);
  }

  private checkData(name: string, password: string): boolean {
    const userInfo = this.users.filter(user => user.name === name);
    return this.isUserExist = (userInfo.length === 1 && this.registrationForm.touched) ? true : false;
  }

  private checkBirth(date: string): boolean {
    const inDays = 24 * 60 * 60 * 1000;
    const birth = new Date(date).getTime();
    const today = new Date(this.currentDate).getTime();
    return this.isRight = ((today - birth) / inDays > 0) ? true : false;
  }

  private matchPasswords(password: string, passwordRepeat: string): boolean {
    if (this.registrationForm.controls['password'].touched && this.registrationForm.controls['passwordRepeat'].touched) {
      return this.isMatch = (password === passwordRepeat) ? true : false;
    }
  }
}
