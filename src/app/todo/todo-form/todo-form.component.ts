import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form (submit)="onSubmit()" [formGroup]="todoForm">
      <input
        placeholder="add details"
        autofocus
        type="text"
        formControlName="todo"
      />
      <button type="submit" [disabled]="todoForm.invalid">Add</button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        gap: 1rem;
        height: 3.5rem;

        input {
          width: 100%;
          text-decoration: none;
          border: 1px #bdbdbd solid;
          padding: 1rem;
          border-radius: 0.75rem;
          outline-color: #2f80ed;
        }

        button {
          color: #fff;
          //padding: 1.25rem 2.5rem;
          padding-inline: 2.5rem;
          background: #2f80ed;
          box-shadow: 0 2px 6px rgba(127, 177, 243, 0.4);
          border-radius: 12px;
          cursor: pointer;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();

  todoForm = this.fb.group({
    todo: ['', Validators.required],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  onSubmit() {
    const todo = this.todoForm.controls.todo.value;
    this.addTodo.emit(todo);
    this.todoForm.controls.todo.patchValue('');
  }
}
