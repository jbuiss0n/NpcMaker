import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'character-ability',
  templateUrl: 'character-ability.component.html',
  styleUrls: ['character-ability.component.less']
})
export class CharacterAbilityComponent {

  @Input()
  public Name: string;

  @Input()
  public Description: string;
}
