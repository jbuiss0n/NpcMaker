import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'character-property',
  templateUrl: 'character-property.component.html',
  styleUrls: ['character-property.component.less']
})
export class CharacterPropertyComponent {

  @Input()
  public Name: string;

  @Input()
  public Description: string;
}
