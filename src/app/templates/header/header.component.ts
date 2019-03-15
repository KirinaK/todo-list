import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public id: string;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.id = this.router.url.match(/\d+/).toString();
  }
}
