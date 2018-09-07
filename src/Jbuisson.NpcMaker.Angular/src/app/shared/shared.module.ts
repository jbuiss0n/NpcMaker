import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as Pipes from './pipes';
import { NotFoundComponent } from './not-found';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    NotFoundComponent,
    Pipes.FilterPipe,
  ],
  exports: [
    Pipes.FilterPipe,
  ]
})
export class SharedModule { }
