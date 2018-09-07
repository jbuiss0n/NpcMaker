import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as Shared from '../shared';
import * as Resolve from './characters.resolve';

import { CharactersEditComponent } from './characters-edit';
import { CharactersListComponent } from './characters-list';
import { CharacterCardComponent } from './character-card';
import { CharacterHeadingComponent } from './character-heading';
import { CharacterPropertyComponent } from './character-property';
import { CharacterAbilityComponent } from './character-ability';
import { CharacterStatisticsComponent } from './character-statistics';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Shared.SharedModule,
  ],
  declarations: [
    CharactersEditComponent,
    CharactersListComponent,
    CharacterCardComponent,
    CharacterHeadingComponent,
    CharacterPropertyComponent,
    CharacterAbilityComponent,
    CharacterStatisticsComponent,
  ],
  providers: [
    Resolve.CharactersResolve,
    Resolve.CharacterIdResolve,
    Resolve.SkillsResolve,
    Resolve.LanguagesResolve,
    Resolve.PropertiesResolve,
    Resolve.SavingThrowsResolve,
  ],
  exports: [
    CharacterCardComponent,
    CharacterHeadingComponent,
    CharacterPropertyComponent,
    CharacterAbilityComponent,
    CharacterStatisticsComponent,
  ]
})
export class CharactersModule { }
