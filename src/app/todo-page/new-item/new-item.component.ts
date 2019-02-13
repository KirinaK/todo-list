import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoItemService } from '../../services/todo-item.service';
import { Todo } from '../../shared/todo';
import { Regexp } from '../../constants/image-regexp.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public changeButton = false;
  public itemForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    img: new FormControl('', Validators.pattern(Regexp)),
  });

  @Input() itemOnChange;
  @Output() addNewItem = new EventEmitter<Todo[]>();
  @Output() changeItem = new EventEmitter<Todo[]>();
  @Output() sortItem = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoItemService) { }

  ngOnInit() {
  }

  public addItem(): void {
    this.addNewItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  private editItem(data: Todo): void {
    this.itemForm.setValue(data);
    this.changeButton = true;
  }

  public updateItem(): void {
    this.changeButton = false;
    this.changeItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  public sorting(): void {
    this.sortItem.emit();
  }
}
