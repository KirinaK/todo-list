import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'todo/:id', component: TodoPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
