import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Models from '../../shared/models';
import { Environment } from '../../../environments/environment';

@Component({
  selector: 'characters-list',
  templateUrl: 'characters-list.component.html',
  styles: [':host{display:block;min-height:100%;width:100%;}']
})
export class CharactersListComponent implements OnInit {

  public Characters: Models.ICharacter[];

  constructor(private route: ActivatedRoute) {
  }

  public async ngOnInit() {
    var data = await this.route.data.toPromise();

    this.Characters = data['Characters'];
  }
}
