import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  public hide: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  openForm() {
    this.hide = false;
  }

}
