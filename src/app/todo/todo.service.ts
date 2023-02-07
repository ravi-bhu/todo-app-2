import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Mode, Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([
    { id: 1, content: 'Build this app', isComplete: false },
    { id: 2, content: 'Complete', isComplete: true },
  ]);

  addTodo(content: string) {
    const nextId = this.getNextId();
    const todo: Todo = {
      id: nextId,
      content,
      isComplete: false,
    };
    this.todosSubject.next([todo, ...this.todosSubject.value]);
  }

  deleteTodo({ id }: Todo) {
    this.todosSubject.next(
      this.todosSubject.value.filter((todo) => todo.id !== id)
    );
  }

  getTodos(mode: Mode): Observable<Todo[]> {
    switch (mode) {
      case Mode.ACTIVE:
        return this.todosSubject
          .asObservable()
          .pipe(map((todos) => todos.filter((todo) => !todo.isComplete)));
      case Mode.COMPLETED:
        return this.todosSubject
          .asObservable()
          .pipe(map((todos) => todos.filter((todo) => todo.isComplete)));
      default:
        return this.todosSubject.asObservable();
    }
  }

  toggleTodo({ id }: Todo) {
    const updatedTodos = this.todosSubject.value.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    this.todosSubject.next(updatedTodos);
  }

  deleteAllTodos() {
    return this.todosSubject.next([]);
  }

  private getNextId(): number {
    return (
      this.todosSubject.value
        .map((todo) => todo.id)
        .sort()
        .pop() ?? 0
    );
  }
}
