import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { defaultImageSrc } from '../shared/constants/constants';
import { LoginPageService } from '../shared/services/login/login-page.service';
import { LoggingService } from '../shared/services/logging/logging.service';
import { UserInfo } from '../shared/interfaces/user-info.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public user: UserInfo;
  public photoLink: string;
  public userDate: Date;
  private input: HTMLInputElement;
  private btnSubmit: HTMLElement;
  private btnCancel: HTMLElement;
  private subscription: Subscription;

  constructor(
    private loginService: LoginPageService,
    private router: Router,
    private logging: LoggingService
  ) { }

  ngOnInit() {
    const userId = +this.router.url.match(/\d+/);
    setTimeout(() => this.getUserInfo(userId), 1000);
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  getUserInfo(userId: number): void {
    this.subscription = this.loginService.getUser(userId).subscribe(
      user => this.showInfo(user),
      error => this.logging.errorLog(error)
    );
  }

  showInfo(data: UserInfo): void {
    this.user = data;
    if (!this.user.photo) {
      this.setDefaultPhoto();
    }
  }

  showElements(): void {
    this.btnSubmit = document.getElementsByClassName('home__change-btn-submit')[0] as HTMLElement;
    this.btnCancel = document.getElementsByClassName('home__change-btn-cancel')[0] as HTMLElement;
    this.input = document.getElementsByClassName('home__change-link')[0] as HTMLInputElement;
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
    this.subscription = this.loginService.updateUser(data).subscribe(
      result => data,
      error => this.logging.errorLog(error)
    );
    this.hideElements();
  }

  setDefaultPhoto(): void {
    this.user.photo = defaultImageSrc;
  }
}
