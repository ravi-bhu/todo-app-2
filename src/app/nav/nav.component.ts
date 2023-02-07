import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <button routerLink="all" routerLinkActive="active">All</button>
      <button routerLink="active" routerLinkActive="active">Active</button>
      <button routerLink="completed" routerLinkActive="active">
        Completed
      </button>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        gap: 5rem;
        border-bottom: 1px solid #bdbdbd;
      }

      button {
        text-decoration: none;
        border: none;
        border-bottom: 4px transparent solid;
        border-radius: 4px 4px 0 0;
        background-color: transparent;
        cursor: pointer;
        padding: 0.5rem 1rem;
      }

      .active {
        border-bottom: 4px #2f80ed solid;
      }

      hr {
        margin: 0;
        background-color: #bdbdbd;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
