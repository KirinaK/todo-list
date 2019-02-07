import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';
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
  public currentItem;

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
    this.getTodoById(item);
    // this.todoService.updateTodoItem(item).subscribe(changedItem => this.currentItem = changedItem);
  }

  getTodoById(item) {
    this.currentItem = this.itemsData.filter(todo => todo.id === item.id)[0];
  }
}
