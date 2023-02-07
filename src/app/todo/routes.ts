import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Mode } from './todo.model';

export default [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {
    path: 'all',
    component: TodoListComponent,
    data: { mode: Mode.ALL },
  },
  {
    path: 'active',
    component: TodoListComponent,
    data: { mode: Mode.ACTIVE },
  },
  {
    path: 'completed',
    component: TodoListComponent,
    data: { mode: Mode.COMPLETED },
  },
] as Routes;
