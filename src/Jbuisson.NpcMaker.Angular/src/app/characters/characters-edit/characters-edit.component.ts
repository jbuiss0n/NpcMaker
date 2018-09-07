import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as Models from '../../shared/models';
import { Environment } from '../../../environments/environment';

@Component({
  selector: 'characters-edit',
  templateUrl: 'characters-edit.component.html',
  styleUrls: ['characters-edit.component.less']
})
export class CharactersEditComponent implements OnInit {

  public Character: Models.ICharacter;

  public Skills: Models.ISkill;
  public Languages: Models.ILanguage;
  public Properties: Models.IProperty;
  public SavingThrows: Models.ISavingThrow;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.data.subscribe(data => {
      this.Character = data['Character'];

      this.Skills = data['Skills'];
      this.Languages = data['Languages'];
      this.Properties = data['Properties'];
      this.SavingThrows = data['SavingThrows'];
    });
  }

  public OnSubmit($event: Event) {
    $event.preventDefault();
  }
}
