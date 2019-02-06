import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiURL: string = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient) { }

  getTodoItems() {
    return this.http.get<any[]>(this.apiURL + '/todo-items');
  }

  getTodoItem(id) {
    return this.http.get(this.apiURL + '/todo-items/' + id);
  }

  createTodoItem(item) {
    return this.http.post(this.apiURL + '/todo-items', JSON.stringify(item), this.httpOptions);
  }  

  updateTodoItem(id, item) {
    return this.http.put(this.apiURL + '/todo-items/' + id, JSON.stringify(item), this.httpOptions);
  }

  deleteTodoItem(id){
    return this.http.delete(this.apiURL + '/todo-items/' + id, this.httpOptions);
  }
}
