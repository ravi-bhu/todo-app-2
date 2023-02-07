import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="todo">
      <label [ngClass]="todo.isComplete ? 'strike' : null">
        <input
          type="checkbox"
          [checked]="todo.isComplete"
          (change)="toggle.emit()"
        />
        {{ todo.content }}
      </label>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
      }

      .strike {
        text-decoration: line-through;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Output() toggle = new EventEmitter<void>();
}
