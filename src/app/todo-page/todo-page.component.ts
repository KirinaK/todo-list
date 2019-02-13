import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';
import { HeaderComponent } from '../templates/header/header.component';
import { MapComponent } from '../templates/map/map.component';
import { TodoItemService } from '../services/todo-item.service';
import { DefaultImage } from '../constants/default-image.constants';
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

  private showTodos(): void {
    this.todoService.getAllTodoItems().subscribe(data => this.itemsData = data);
  }

  public createItem(item: Todo): void {
    this.todoService.createTodoItem(item).subscribe(newItem => this.itemsData = this.itemsData.concat(newItem));
  }

  public deleteItem(item: Todo): void {
    this.todoService.deleteTodoItem(item.id).subscribe(() => {
      this.itemsData = this.itemsData.filter(todo => todo.id !== item.id);
    });
  }

  public updateItem(item: Todo): void {
    const currentItem = this.itemsData.find(todo => todo.id === item.id);
    this.todoService.updateTodoItem(item).subscribe(changedItem => Object.assign(currentItem, changedItem));
  }

  public sortingItems(): void {
    this.itemsData.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }

  public showText(item: any, event: any): void {
    const lengthOfString = item.description.length;
    (lengthOfString >= 54) ? item.show = !item.show : item.show;
    event.target.style.whiteSpace = (lengthOfString >= 27) ? 'pre-wrap' : 'nowrap';
    event.target.style.wordBreak = (lengthOfString >= 27) ? 'break-all' : 'normal';
    event.target.parentElement.style.minHeight = (item.show === true) ? '300px' : '250px';
  }

  public setDefaultImage(item: Todo): void {
    item.img = DefaultImage;
  }
}
