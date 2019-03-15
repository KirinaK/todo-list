import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../shared/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiURL = environment.apiUrl;
  private todoItems: BehaviorSubject<Todo[]> = new BehaviorSubject([]);
  public todoData$ = this.todoItems.asObservable();

  constructor(private http: HttpClient) { }

  getAllTodoItems(id: number) {
    return this.http.get<any>(this.apiURL + '/todo-items?userId=' + id);
  }

  createTodoItem(item: Todo) {
    return this.http.post<Todo[]>(this.apiURL + '/todo-items', item);
  }

  updateTodoItem(item: Todo) {
    return this.http.put<Todo[]>(this.apiURL + '/todo-items/' + item.id, item);
  }

  deleteTodoItem(id: number) {
    return this.http.delete<Todo[]>(this.apiURL + '/todo-items/' + id);
  }
}
