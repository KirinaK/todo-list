import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoItemService } from '../../services/todo-item.service';
import { Todo } from '../../shared/todo';
import { Regexp } from '../../constants/image-regexp.constants';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public changeButton: boolean = false;
  public itemForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    img: new FormControl('')
  });

  @Input() itemOnChange;
  @Output() addNewItem = new EventEmitter<Todo[]>();
  @Output() changeItem = new EventEmitter<Todo[]>();
  @Output() sortItem = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoItemService) { }

  ngOnInit() {
  }

  addItem() {
    this.addNewItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  editItem(data) {
    this.itemForm.setValue(data);
    this.changeButton = true;
  }

  updateItem() {
    this.changeButton = false;
    this.changeItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  sorting() {
    this.sortItem.emit();
  }
}
