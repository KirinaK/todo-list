import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from '../services/login-page.service';
import { LoggingService } from '../services/logging.service';
// TODO: rename it like defaultImageSrc or defaultImage
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

  // TODO: rewrite it like this for all constructors
  /* constructor(
    private loginService: LoginPageService,
    private router: Router,
    private logging: LoggingService
  ) { } */
  constructor(private loginService: LoginPageService,
              private router: Router,
              private logging: LoggingService) { }

  ngOnInit() {
    const userId = +this.router.url.match(/\d+/);
    this.getUserInfo(userId);
  }

  // TODO: add type for a param
  getUserInfo(userId) {
    this.subscription = this.loginService.getUser(userId).subscribe(
      user => this.showInfo(user),
      error => this.logging.errorLog(error)
    );
  }

  // TODO: rename it into user :)
  showInfo(data) {
    this.about = data;
  }

  showElements(): void {
    // TODO: make it like a component or think about improvements
    this.btnSubmit = document.getElementsByClassName('info__btn-submit')[0] as HTMLElement;
    this.btnCancel = document.getElementsByClassName('info__btn-cancel')[0] as HTMLElement;
    this.input = document.getElementsByClassName('info__link')[0] as HTMLInputElement;
    // TODO: it's better to use classes or classes for the root element
    this.btnSubmit.style.display = 'inline-block';
    this.btnCancel.style.display = 'inline-block';
    this.input.style.display = 'inline-block';
  }

  hideElements(): void {
    // TODO: use class instead - one line of code instead of 4
    this.btnSubmit.style.display = 'none';
    this.btnCancel.style.display = 'none';
    this.input.style.display = 'none';
    this.input.value = '';
  }

  editPhoto(data: UserInfo): void {
    data.photo = this.photoLink;
    // TODO: why do you create a variable when you can just pass the data instead?
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

  // TODO: this do not work + leak of memory. FIX THIS ASAP !!!
  //  And move to the top. All lifecycle hooks must be on the top of the class
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
