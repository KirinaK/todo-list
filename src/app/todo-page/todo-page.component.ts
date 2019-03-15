import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoItemService } from '../services/todo-item.service';
import { ConnectionService } from '../services/connection.service';
import { LoggingService } from '../services/logging.service';
import { DefaultImage } from '../constants/default-image.constants';
import { Todo } from '../shared/todo';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  providers: [TodoItemService]
})
export class TodoPageComponent implements OnInit {
  public itemsData: Todo[] = [];
  public imageLoader = true;
  private subscription: Subscription;
  private userId: number;

  constructor(private todoService: TodoItemService,
              private connectionService: ConnectionService,
              private logger: LoggingService,
              private router: Router) { }

  ngOnInit() {
    this.userId = +this.router.url.match(/\d+/);
    this.showTodos();
  }

  private showTodos(): void {
    this.subscription = this.todoService.getAllTodoItems(this.userId).subscribe(
      data => this.itemsData = data,
      error => this.logger.errorLog(error)
    );
  }

  public createItem(item: Todo): void {
    this.subscription = this.todoService.createTodoItem(item).subscribe(
      newItem => this.itemsData = this.itemsData.concat(newItem),
      error => this.logger.errorLog(error)
    );
  }

  public deleteItem(item: Todo): void {
    this.subscription = this.todoService.deleteTodoItem(item.id).subscribe(
      () => this.itemsData = this.itemsData.filter(todo => todo.id !== item.id),
      error => this.logger.errorLog(error)
    );
  }

  public updateItem(item: Todo): void {
    const currentItem = this.itemsData.find(todo => todo.id === item.id);
    this.subscription = this.todoService.updateTodoItem(item).subscribe(
      changedItem => Object.assign(currentItem, changedItem),
      error => this.logger.errorLog(error)
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
    (lengthOfString >= 25) ? item.show = !item.show : item.show;
    event.target.style.wordBreak = (lengthOfString >= 20) ? 'break-all' : 'normal';
    event.target.parentElement.style.minHeight = (item.show === true) ? '290px' : '240px';
    if (!item.show) {
      event.target.scrollTop = 0;
    }
  }

  public showTitle(item: any, event: any): void {
    const lengthOfString = item.title.length;
    (lengthOfString >= 15) ? item.showTitle = !item.showTitle : item.showTitle;
    event.target.parentElement.style.minHeight = (item.showTitle === true) ? '260px' : '240px';
  }

  public setDefaultImage(item: Todo): void {
    item.img = DefaultImage;
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
