import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';
import { LoggingService } from '../../services/logging.service';
import { Todo } from '../../shared/todo';
import { Regexp } from '../../constants/image-regexp.constants';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

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
    img: new FormControl('', Validators.pattern(Regexp)),
    date: new FormControl(''),
  });
  private subscription: Subscription;

  @Output() addNewItem = new EventEmitter<Todo[]>();
  @Output() changeItem = new EventEmitter<Todo[]>();
  @Output() sortItem = new EventEmitter<Todo[]>();

  constructor(private connectionService: ConnectionService,
              private logger: LoggingService) { }

  ngOnInit() {
    this.checkData();
  }

  public addItem(): void {
    this.addNewItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  public editItem(item): void {
    this.itemForm.controls['id'].setValue(item.id);
    this.itemForm.controls['title'].setValue(item.title);
    this.itemForm.controls['description'].setValue(item.description);
    this.itemForm.controls['img'].setValue(item.img);
    this.itemForm.controls['date'].setValue(item.date);
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

  private checkData(): void {
    this.subscription = this.connectionService.todoData$.subscribe(
      item => {
        if (Object.keys(item).length !== 0) {
          this.editItem(item);
        }
      },
      error => this.logger.errorLog(error)
    );
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
