import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Mode, Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoFormComponent],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <app-todo-form
        *ngIf="!vm.isCompleteTab"
        (addTodo)="onAddTodo($event)"
      ></app-todo-form>
      <div class="todo-list" *ngFor="let todo of vm.todos">
        <app-todo-item [todo]="todo" (toggle)="onTodoToggle(todo)">
        </app-todo-item>
        <button
          class="delete-btn"
          *ngIf="vm.isCompleteTab"
          type="button"
          (click)="onDelete(todo)"
        >
          <span class="icon delete-icon gray"></span>
        </button>
      </div>
      <button
        class="delete-all-btn"
        *ngIf="vm.isCompleteTab"
        (click)="onDeleteAll()"
      >
        <span>
          <span class="icon delete-icon white"></span>
          delete all
        </span>
      </button>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }

      app-todo-form {
        margin: 1rem 0;
      }

      .todo-list {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.5rem;
      }

      .delete-btn {
        background: transparent;
        text-decoration: none;
        border: 0;
        cursor: pointer;
      }

      .delete-all-btn {
        background: #eb5757;
        color: #fff;
        text-decoration: none;
        border: 0;
        cursor: pointer;
        padding: 0.75rem 2rem;
        align-self: flex-end;
        border-radius: 0.25rem;

        > span {
          display: flex;
          align-items: center;
          font-weight: 600;
        }
      }

      .icon {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        mask-size: cover;
      }

      .delete-icon {
        mask: url('../../../assets/icons/delete.svg');
        mask-repeat: no-repeat;
        padding-inline: 0.3rem;
      }

      .gray {
        background: #bdbdbd;
      }

      .white {
        background: #fff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private todos$ = this.activatedRoute.data.pipe(
    map((data) => data['mode']),
    switchMap((mode: Mode) => this.todoService.getTodos(mode))
  );

  private isCompleteTab$ = this.activatedRoute.data.pipe(
    map((data) => data['mode']),
    map((mode) => mode === Mode.COMPLETED)
  );

  vm$ = combineLatest([this.todos$, this.isCompleteTab$]).pipe(
    map(([todos, isCompleteTab]) => ({ todos, isCompleteTab }))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  onTodoToggle(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  onDeleteAll() {
    this.todoService.deleteAllTodos();
  }

  onAddTodo(todo: string) {
    this.todoService.addTodo(todo);
  }
}
