import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'character-heading',
  templateUrl: 'character-heading.component.html',
  styleUrls: ['character-heading.component.less']
})
export class CharacterHeadingComponent {

  @Input()
  public Name: string;

  @Input()
  public Race: string;

  @Input()
  public Gender?: boolean;
}
