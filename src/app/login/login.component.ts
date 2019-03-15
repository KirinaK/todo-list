import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageService } from '../services/login-page.service';
import { LoggingService } from '../services/logging.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    password: new FormControl('')
  });
  public isUserExist: boolean = true;
  public createUser: boolean = true;
  public isCorrect: boolean = true;
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
      this.users.forEach(item => {
        (item.name === name && item.password === password) ? this.id = item.id : null;
      })
      this.auth.sendToken(name);
      this.router.navigate(['/home/' + this.id]);
    }
    this.loginForm.reset();
  }

  signup() {
    this.createUser = !this.isUserExist ? true : false;
    if (!this.isUserExist) {
      this.users.filter(item => {
        let lastId = (item.id === this.users.length) ? item.id : null;
        this.loginForm.controls['id'].setValue(++lastId);
      });
      this.loginService.createUser(this.loginForm.value).subscribe();
      this.auth.sendToken(name);
      this.router.navigate(['/home/' + this.loginForm.value.id]);
    }
    this.loginForm.reset();
  }

  checkData(name, password) {
    const user = this.users.filter(item => item.name === name);
    this.isUserExist = (user.length === 1) ? true : false;
    if (this.isUserExist) return this.checkPassword(user, password);
    return this.isUserExist;
  }

  checkPassword(user, pass) {
    return this.isCorrect = (user[0].password === pass) ? true : false;
  }
}
