import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from '../shared/todo';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private todoItem: BehaviorSubject<any> = new BehaviorSubject({});
  public todoData$: Observable<Todo> = this.todoItem.asObservable();

  constructor() { }

  public sendItem(value: Todo): void {
    this.todoItem.next(value);
  }
}
