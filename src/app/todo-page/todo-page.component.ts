import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';
import { HeaderComponent } from '../templates/header/header.component';
import { MapComponent } from '../templates/map/map.component';
import { TodoItemService } from '../services/todo-item.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  providers: [TodoItemService]
})
export class TodoPageComponent implements OnInit {
  public itemsData: Todo[] = [];

  constructor(private todoService: TodoItemService) { }

  ngOnInit() {
    this.showTodos();
  }

  showTodos() {
    this.todoService.getAllTodoItems().subscribe(data => this.itemsData = data);
  }

  createItem(item: Todo) {
    this.todoService.createTodoItem(item).subscribe(newItem => this.itemsData = this.itemsData.concat(newItem));
  }

  deleteItem(item: Todo) {
    this.todoService.deleteTodoItem(item.id).subscribe(() => {
      this.itemsData = this.itemsData.filter(todo => todo.id !== item.id);
    });
  }

  updateItem(item) {
    let currentItem = this.itemsData.find(todo => todo.id === item.id);
    return this.todoService.updateTodoItem(item).subscribe(changedItem => Object.assign(currentItem, changedItem));
  }

  sortingItems(event) {
    this.itemsData.sort((a,b) => {
      return a.date.localeCompare(b.date)
    });
  }
}
