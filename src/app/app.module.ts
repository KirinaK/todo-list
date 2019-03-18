import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './templates/header/header.component';
import { HomeComponent } from './home/home.component';
import { NewItemComponent } from './todo-page/new-item/new-item.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { MapComponent } from './templates/map/map.component';
import { SpinnerComponent } from './templates/spinner/spinner.component';

import { LoginPageService } from './services/login-page.service';
import { AuthService } from './services/auth.service';
import { TodoItemService } from './services/todo-item.service';
import { LoggingService } from './services/logging.service';

import { AuthGuard } from './guards/auth.guard';

/* TODO: find a way to somehow not to download this file each time */
import { ApiKey } from './constants/api-key.constants';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoPageComponent,
    NewItemComponent,
    HeaderComponent,
    MapComponent,
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ApiKey
    })
  ],
  providers: [
    TodoItemService,
    LoggingService,
    LoginPageService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
