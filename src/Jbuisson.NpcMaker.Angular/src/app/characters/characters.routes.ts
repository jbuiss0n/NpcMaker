import { Route } from '@angular/router';

import * as Resolve from './characters.resolve';

import { CharactersEditComponent } from './characters-edit';
import { CharactersListComponent } from './characters-list';
import { CharacterCardComponent } from './character-card';

export const CharactersRoutes: Route[] = [
  {
    path: 'characters',
    children: [
      {
        path: '',
        component: CharactersListComponent,
        resolve: {
          Characters: Resolve.CharactersResolve
        }
      },
      {
        path: 'create',
        component: CharactersEditComponent,
        resolve: {
          Languages: Resolve.LanguagesResolve,
          Skills: Resolve.SkillsResolve,
          Properties: Resolve.PropertiesResolve,
          SavingThrows: Resolve.SavingThrowsResolve,
        }
      },
      {
        path: ':id/print',
        component: CharacterCardComponent,
        resolve: {
          Character: Resolve.CharacterIdResolve,
        }
      },
      {
        path: ':id',
        component: CharactersEditComponent,
        resolve: {
          Character: Resolve.CharacterIdResolve,
          Languages: Resolve.LanguagesResolve,
          Skills: Resolve.SkillsResolve,
          Properties: Resolve.PropertiesResolve,
          SavingThrows: Resolve.SavingThrowsResolve,
        },
      }
    ]
  }
];
