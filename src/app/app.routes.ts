import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/main/main.routes').then((m) => m.routes),
  },
  {
    path: 'minesweeper',
    loadChildren: () =>
      import('./components/minesweeper/minesweeper.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'memory',
    loadChildren: () =>
      import('./components/memory/memory.routes').then((m) => m.routes),
  },
  {
    path: 'simon',
    loadChildren: () =>
      import('./components/simon/simon.routes').then((m) => m.routes),
  },
];
