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
import { SpinnerComponent } from './templates/spinner/spinner.component';

import { TodoItemService } from './services/todo-item.service';
import { LoggingService } from './services/logging.service';

import { ApiKey } from './constants/api-key.constants';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoPageComponent,
    NewItemComponent,
    HeaderComponent,
    MapComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ApiKey
    })
  ],
  providers: [TodoItemService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
