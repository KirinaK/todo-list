import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';
import { TodoItemService } from '../services/todo-item.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  public itemsData: Array<Object> = [];
  private todoItems: Array<Object> = JSON.parse(localStorage.getItem('todo-items'))


  constructor(private todoService: TodoItemService) { }

  ngOnInit() {
    this.showItemsFromService();
  }

  getItem(event) {
    this.itemsData.push(event)
    localStorage.setItem('todo-items', JSON.stringify(this.itemsData));
  }

  deleteItem(data) {
    this.itemsData = this.itemsData.filter(item => item !== data);
    this.todoItems = this.todoItems.filter(item => item !== data);
    localStorage.setItem('todo-items', JSON.stringify(this.todoItems));
  }

  editItem(data) {
    console.log(data);
  }

  showItemsFromService() {
    this.todoService.getTodoItems().subscribe(data => {
      data.forEach(item => this.itemsData.push(item));
    });
  }

}
