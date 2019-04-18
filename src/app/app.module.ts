import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/templates/header/header.component';
import { HomeComponent } from './home/home.component';
import { NewItemComponent } from './todo-page/new-item/new-item.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { MapComponent } from './shared/templates/map/map.component';
import { SpinnerComponent } from './shared/templates/spinner/spinner.component';

import { LoginPageService } from './shared/services/login/login-page.service';
import { AuthService } from './shared/services/auth/auth.service';
import { TodoItemService } from './shared/services/todo-item/todo-item.service';
import { LoggingService } from './shared/services/logging/logging.service';

import { AuthGuard } from './shared/guards/auth.guard';

import { apiKey } from './shared/constants/constants';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoPageComponent,
    NewItemComponent,
    HeaderComponent,
    MapComponent,
    SpinnerComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: apiKey
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
