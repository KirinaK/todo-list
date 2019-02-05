import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'todo', component: TodoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
