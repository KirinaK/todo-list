import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageService } from '../shared/services/login/login-page.service';
import { LoggingService } from '../shared/services/logging/logging.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    password: new FormControl(''),
    date: new FormControl(''),
    content: new FormControl(''),
    photo: new FormControl('')
  });
  public isUserExist = true;
  public createUser = true;
  public isCorrect = true;
  private id: number;
  private users: any = [];

  constructor(private router: Router,
              private loginService: LoginPageService,
              private logger: LoggingService,
              private auth: AuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    return this.loginService.getAllUsers().subscribe(
      result => this.users = result,
      error => this.logger.errorLog(error)
    );
  }

  login() {
    const name = this.loginForm.value.name;
    const password = this.loginForm.value.password;
    if (this.checkData(name, password)) {
      this.users.forEach(user => {
        (user.name === name && user.password === password) ? this.id = user.id : null;
      });
      this.auth.sendToken(this.id.toString());
      this.router.navigate(['/home/' + this.id]);
    }
    this.loginForm.reset();
  }

  signup() {
    const name = this.loginForm.value.name;
    const password = this.loginForm.value.password;
    this.checkData(name, password);
    this.createUser = !this.isUserExist ? true : false;
    if (!this.isUserExist) {
      this.users.filter(user => {
        let lastId = (user.id === this.users.length) ? user.id : null;
        this.loginForm.controls['id'].setValue(++lastId);
        this.id = this.loginForm.controls['id'].value;
      });
      this.auth.sendToken(this.id.toString());
      this.loginService.createUser(this.loginForm.value).subscribe();
      this.router.navigate(['/home/' + this.loginForm.value.id]);
    }
    this.loginForm.reset();
  }

  checkData(name, password) {
    const userInfo = this.users.filter(user => user.name === name);
    this.isUserExist = (userInfo.length === 1) ? true : false;
    if (this.isUserExist) return this.checkPassword(userInfo, password);
    return this.isUserExist;
  }

  checkPassword(user, pass) {
    return this.isCorrect = (user[0].password === pass) ? true : false;
  }
}
