import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { NewItemComponent } from './todo-page/new-item/new-item.component';

import { TodoItemService } from './services/todo-item.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoPageComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TodoItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
