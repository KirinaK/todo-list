import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todo } from '../shared/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiURL = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getAllTodoItems() {
    return this.http.get<Todo[]>(this.apiURL + '/todo-items');
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
