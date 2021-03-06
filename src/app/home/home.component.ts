import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from '../services/login-page.service';
import { LoggingService } from '../services/logging.service';
import { DefaultImage } from '../constants/default-image.constants';
import { UserInfo } from '../shared/user-info.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public about: UserInfo;
  public photoLink: string;
  public userDate: Date;
  private input: HTMLInputElement;
  private btnSubmit: HTMLElement;
  private btnCancel: HTMLElement;
  private subscription: Subscription;

  constructor(private loginService: LoginPageService,
              private router: Router,
              private logging: LoggingService) { }

  ngOnInit() {
    const userId = +this.router.url.match(/\d+/);
    setTimeout(() => {this.getUserInfo(userId)}, 1000);
  }

  getUserInfo(userId) {
    this.subscription = this.loginService.getUser(userId).subscribe(
      user => this.showInfo(user),
      error => this.logging.errorLog(error)
    );
  }

  showInfo(data) {
    this.about = data;
  }

  showElements(): void {
    this.btnSubmit = document.getElementsByClassName('info__btn-submit')[0] as HTMLElement;
    this.btnCancel = document.getElementsByClassName('info__btn-cancel')[0] as HTMLElement;
    this.input = document.getElementsByClassName('info__link')[0] as HTMLInputElement;
    this.btnSubmit.style.display = 'inline-block';
    this.btnCancel.style.display = 'inline-block';
    this.input.style.display = 'inline-block';
  }

  hideElements(): void {
    this.btnSubmit.style.display = 'none';
    this.btnCancel.style.display = 'none';
    this.input.style.display = 'none';
    this.input.value = '';
  }

  editPhoto(data: UserInfo): void {
    data.photo = this.photoLink;
    const newData = data;
    this.subscription = this.loginService.updateUser(newData).subscribe(
      result => newData,
      error => this.logging.errorLog(error)
    );
    this.hideElements();
  }

  setDefaultPhoto() {
    this.about.photo = DefaultImage;
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
