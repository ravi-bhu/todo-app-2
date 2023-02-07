import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  template: `
    <main>
      <h1>#todo</h1>
      <app-nav></app-nav>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin-inline: 0.5rem;
      }

      app-nav {
        display: inline-block;
      }

      h1 {
        align-self: center;
        font-family: 'Raleway', sans-serif;
        font-size: 2.25rem;
      }

      main {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 40rem;
      }
    `,
  ],
})
export class AppComponent {}
