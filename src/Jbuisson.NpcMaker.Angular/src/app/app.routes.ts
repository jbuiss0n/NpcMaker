import { Route } from '@angular/router';

import { AppComponent } from './app.component';

import * as Characters from './characters';
import * as Shared from './shared';

export const AppRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      ...Characters.CharactersRoutes,
      { path: '404', component: Shared.NotFoundComponent },
      { path: '**', component: Shared.NotFoundComponent },
    ]
  },
];
