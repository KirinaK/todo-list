import { Component, OnInit } from '@angular/core';
import { AboutConstant } from '../constants/about.constants';
import { LoginPageService } from '../services/login-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public about = AboutConstant;

  constructor(private loginService: LoginPageService) { }

  ngOnInit() {
    // this.loginService.getAllUsers().subscribe(res => console.log(res))
  }
}
