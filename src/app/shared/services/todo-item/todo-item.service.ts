import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { pipe } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Todo } from '../../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiURL = environment.apiUrl;
  private todoItems: BehaviorSubject<Todo[]> = new BehaviorSubject([]);
  public todoData$ = this.todoItems.asObservable();

  constructor(private http: HttpClient) { }

  getAllTodoItems(id: number): Observable<Todo[]> {
    return this.http.get<any>(this.apiURL + '/todo-items?userId=' + id);
  }

  createTodoItem(item: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.apiURL + '/todo-items', item);
  }

  updateTodoItem(item: Todo): Observable<Todo[]> {
    return this.http.put<Todo[]>(this.apiURL + '/todo-items/' + item.id, item);
  }

  deleteTodoItem(id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>(this.apiURL + '/todo-items/' + id);
  }
}
