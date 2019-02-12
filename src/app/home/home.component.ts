import { Component, OnInit } from '@angular/core';
import { AboutConstant } from '../constants/about.constants';
import { HeaderComponent } from '../templates/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public about = AboutConstant;

  constructor() { }

  ngOnInit() {
  }

}
