import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import * as Models from '../../shared/models';
import { Environment } from '../../../environments/environment';

@Component({
  selector: 'character-card',
  templateUrl: 'character-card.component.html',
  styleUrls: ['character-card.component.less']
})
export class CharacterCardComponent implements OnInit {

  @Input()
  public Character: Models.ICharacter;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.data.subscribe(data => {
      this.Character = data['Character'];
    });
  }
}
