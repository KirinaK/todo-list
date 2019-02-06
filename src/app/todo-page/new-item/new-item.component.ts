import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoItemService } from '../../services/todo-item.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public itemForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    img: new FormControl('')
  });

  constructor(private todoService: TodoItemService) { }

  ngOnInit() {
  }

  addItem() {
    this.todoService.createTodoItem(this.itemForm.value).subscribe();
    this.itemForm.reset();
  }

}
