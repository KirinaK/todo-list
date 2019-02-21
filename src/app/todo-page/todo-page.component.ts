import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewItemComponent } from './new-item/new-item.component';
import { HeaderComponent } from '../templates/header/header.component';
import { MapComponent } from '../templates/map/map.component';
import { TodoItemService } from '../services/todo-item.service';
import { ConnectionService } from '../services/connection.service';
import { DefaultImage } from '../constants/default-image.constants';
import { Todo } from '../shared/todo';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  providers: [TodoItemService]
})
export class TodoPageComponent implements OnInit {
  public itemsData: Todo[] = [];
  private subscription: Subscription;

  constructor(private todoService: TodoItemService, private connectionService: ConnectionService) { }

  ngOnInit() {
    this.showTodos();
  }

  private showTodos(): void {
    this.subscription = this.todoService.getAllTodoItems().subscribe(
      data => this.itemsData = data,
      error => {
        console.error(error.message);
        return throwError(error);
      }
    );
  }

  public createItem(item: Todo): void {
    this.subscription = this.todoService.createTodoItem(item).subscribe(
      newItem => this.itemsData = this.itemsData.concat(newItem),
      error => {
        console.error(error.message);
        return throwError(error);
      }
    );
  }

  public deleteItem(item: Todo): void {
    this.subscription = this.todoService.deleteTodoItem(item.id).subscribe(
      () => { this.itemsData = this.itemsData.filter(todo => todo.id !== item.id); },
      error => {
        console.error(error.message);
        return throwError(error);
      }
    );
  }

  public updateItem(item: Todo): void {
    const currentItem = this.itemsData.find(todo => todo.id === item.id);
    this.subscription = this.todoService.updateTodoItem(item).subscribe(
      changedItem => Object.assign(currentItem, changedItem),
      error => {
        console.error(error.message);
        return throwError(error);
      }
    );
  }

  public editItem(value) {
    this.connectionService.sendItem(value);
  }

  public sortingItems(): void {
    this.itemsData.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }

  public showText(item: any, event: any): void {
    const lengthOfString = item.description.length;
    (lengthOfString >= 54) ? item.show = !item.show : item.show;
    event.target.style.whiteSpace = (lengthOfString >= 20) ? 'pre-wrap' : 'nowrap';
    event.target.style.wordBreak = (lengthOfString >= 20) ? 'break-all' : 'normal';
    event.target.parentElement.style.minHeight = (item.show === true) ? '300px' : '250px';
  }

  public setDefaultImage(item: Todo): void {
    item.img = DefaultImage;
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
    console.log('I unsubscribe');
  }
}
