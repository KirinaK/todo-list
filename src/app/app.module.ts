import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { NewItemComponent } from './todo-page/new-item/new-item.component';
import { HeaderComponent } from './templates/header/header.component';
import { MapComponent } from './templates/map/map.component';

import { TodoItemService } from './services/todo-item.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoPageComponent,
    NewItemComponent,
    HeaderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1l8s9mTtMY3gyvG5xSyFIf64U4Lbpqm4'
    })
  ],
  providers: [TodoItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
