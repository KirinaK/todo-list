import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConnectionService } from '../../shared/services/connection/connection.service';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { regexp } from '../../shared/constants/constants';
import { Todo } from '../../shared/interfaces/todo';


@Component({
  selector: 'new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit, OnDestroy {
  public changeButton = false;
  public itemForm = new FormGroup({
    userId: new FormControl(null),
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    date: new FormControl(''),
  });
  private subscription: Subscription;
  private userId: number;

  @Output() addNewItem = new EventEmitter<Todo[]>();
  @Output() changeItem = new EventEmitter<Todo[]>();
  @Output() sortItem = new EventEmitter<Todo[]>();

  constructor(
    private connectionService: ConnectionService,
    private logger: LoggingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = +this.router.url.match(/\d+/);
    this.checkData();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  public addItem(): void {
    this.itemForm.controls['userId'].setValue(this.userId);
    this.addNewItem.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  public editItem(item: Todo): void {
    this.itemForm.controls['userId'].setValue(this.userId);
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
}
